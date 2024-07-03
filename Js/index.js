// alert('Hi')

// For Background Img
// const BgImgData = async (ID) =>{
//   Url = `https://api.themoviedb.org/3/${ID}/images?api_key=${key}`;
//   const Response = await fetch(Url);

// }

// Fetch Data
const FetchData = async (Url) =>{
  try{
    const REsp = await fetch(Url);
    if(!REsp.ok){
      throw Error('Could not fetch data from the API');
    } else {
      const data = await REsp.json();
      return data;
    }
  } 
  catch{
    console.error(Error)
  }
}

// Trailer 
const Trailer = async (Media_Type , ID) =>{
  const YoutubeUrl = `https://www.youtube.com/watch?v`;
  const BaseUrl = `https://api.themoviedb.org/3/`;
  const FetchTraier = await fetch(`${BaseUrl}/${Media_Type}/${ID}/videos?api_key=${key}`);
  const TrailerData = await FetchTraier.json();
  const FilterTrailer = TrailerData.results.filter(video => video.type === 'Trailer' && video.official == true)
  const FinalTrailer = FilterTrailer.slice(FilterTrailer.length - 1)[0];
  const Youtube = (`${YoutubeUrl}=${FinalTrailer.key}`)
  // console.log(Youtube);
  WiondowOpen(Youtube)
}
const WiondowOpen = (Url) =>{
  window.open(Url, '_blank');
}
const Automate = (Elements , ClassName , Append) =>{
  const Element = document.createElement(Elements);
  Element.className = ClassName;
  Append.appendChild(Element);
  return Element;
}

// Fething Gners
const FetchGner = async (Media_Type , ID) =>{
    const FetchG = await fetch(`https://api.themoviedb.org/3/genre/${Media_Type}/list?api_key=${key}`);
    const Response = await FetchG.json();
    //console.log(Response)
    const RsGenres = Response.genres.map( Id =>{
      return Id;
    });
    if(!Response.genres.ok && Response.genres.length <= 0){
      throw Error('Could not fetch data from the API');
    };
    const FindNameById = RsGenres.filter(byId => byId.id ===  ID);
    //console.log(FindNameById[0].name)
    return FindNameById.length >= 0 ? FindNameById[0].name : null;
}
// FetchGner('tv' , 10765)

const Trending = async () =>{
  const Trend = await FetchData(`https://api.themoviedb.org/3/trending/all/day?api_key=${key}`)
  //console.log(Data.results);
  for(const Data of Trend.results ){
    // Backdrop Image collections api
    const BgImgs = await FetchData(`https://api.themoviedb.org/3/${Data.media_type}/${Data.id}/images?api_key=${key}`);
    const BgImg = BgImgs.backdrops.filter(Img => Img.iso_639_1 !== null)

    // Creat Element
    // Main Item
    const Carousel_Inner = document.getElementById('Inner');
    const Item = document.createElement('div');
    Item.className = 'carousel-item';
    Carousel_Inner.appendChild(Item);
    //Background Img
    const BackdropImg = document.createElement('img')
     BackdropImg.className = 'BackdropImg';
     if(BgImg.length == 0){
      BackdropImg.src = `https://image.tmdb.org/t/p/original/${Data.backdrop_path}`
     } else {
      BackdropImg.src = `https://image.tmdb.org/t/p/original/${BgImg[Math.floor(Math.random() * BgImg.length)].file_path}`
     }
     // Defult
     // BackdropImg.src = '../images/wallpaperflare.com_wallpaper (3).jpg'
     BackdropImg.alt = BackdropImg.title = Data.title || Data.name;
     Item.appendChild(BackdropImg);
     // Poster And other Details
     const POster_Info = document.createElement('div');
     POster_Info.className = 'Poster_Info';
     POster_Info.onclick = () =>{
      alert(Data.id)
    }
     Item.appendChild(POster_Info);
     // POster
     const Poster = document.createElement('img');
     Poster.className = 'Poster';
     Poster.src = `https://image.tmdb.org/t/p/w500/${Data.poster_path}`;
     Poster.alt = Data.title || Data.name;
     POster_Info.appendChild(Poster);
     // Informations
     const Info = document.createElement('div');
     Info.className = 'Info';
     POster_Info.appendChild(Info);
     // Year
     const Year = document.createElement('p');
     Year.className = 'Year';
     Year.textContent = (Data.release_date || Data.first_air_date).substring(0, 4);
     Info.appendChild(Year);
     // Title
     const Title = Automate('h2' , 'Title' , Info);
     Title.textContent = Data.title || Data.name;
     Title.textContent.length >= 20 ? Title.style.fontSize  = '1.77vw' : Title.style.fontSize = '2.33vw';
     // Genres
     const Genres = Automate('ul' , 'Genres' , Info);
     Data.genre_ids.map( async pr =>{
      const Gn = await FetchGner(Data.media_type , pr);
      const Genre = Automate('li' , 'Genre' , Genres);
      Genre.textContent = Gn;
     });
     // Rating
      const Rate_Voters_Trailer = Automate('div' , 'Rate_Voters_Trailer' , Info)
      const RatingBar =  Automate('div' , 'RatingBar' , Rate_Voters_Trailer);
      const RatingBlankBg =  Automate('span' , 'RatingBlankBg' , RatingBar);
      const RateBg = Automate('span' , 'RateBg' , RatingBlankBg);
      const RatingCover = Automate('span' , 'RatingCover' , RateBg);
      const Rate = Automate('p' , 'Rate' , RatingCover);
      Rate.textContent = Math.floor(Data.vote_average * 10) ;
      // Voters
      const Voters = Automate('span' , 'Voters' , Rate_Voters_Trailer);
      Voters.innerHTML = '<i class="bi bi-people-fill"></i> ' + Data.vote_count;
      Voters.title = 'Voters';
      // PLay Trailer
      const BtnPLayTariler = Automate('button' , 'BtnPLayTariler' , Rate_Voters_Trailer);
      BtnPLayTariler.innerHTML = '<i class="bi bi-play-circle"></i> ' +'Play Trailer ';
      BtnPLayTariler.title = 'Play Trailer';
      BtnPLayTariler.onclick = async ( Event ) =>{
        Event.stopPropagation();
        await Trailer(Data.media_type , Data.id);
      }
    //console.log(Data);
    Carousel_Inner.children[0].classList.add('active');
  }
}
Trending();