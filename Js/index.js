// alert('Hi')
"use strict";

// Fetch Data Trend
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


// Creat Element By Data
const Automate = (Elements , ClassName , Append) =>{
  const Element = document.createElement(Elements);
  Element.className = ClassName;
  Append.appendChild(Element);
  return Element;
}

// Trailer 
const Trailer = async (Media_Type , ID) =>{
  const YoutubeUrl = `https://www.youtube.com/watch?v`;
  const BaseUrl = `https://api.themoviedb.org/3/`;
  const FetchTraier = await fetch(`${BaseUrl}/${Media_Type}/${ID}/videos?language=en-US` , Keyx);
  const TrailerData = await FetchTraier.json();
  const FilterTrailer = TrailerData.results.filter(video => video.type === 'Trailer' && video.official == true);
  let FinalTrailer;
  // If Trailer not Found
  if(FilterTrailer.length == 0){
    FinalTrailer = 'No Trailer Found';
    const Ntf = document.createElement('div');
    Ntf.className = 'not-found-Container';
    const Ntf_box = Automate('div' , 'Ntf-Box' , Ntf);
    const Ntf_Icon = Automate('i' , 'bi bi-x-circle' , Ntf_box);
    const Ntf_Title = Automate('p' , 'Ntf_Title' , Ntf_box);
    Ntf_Title.textContent = FinalTrailer;
    const Ntf_Btn = Automate('button' , 'Ntf_Btn' , Ntf_box);
    Ntf_Btn.onclick = () =>{
      Ntf.remove();
    }
    Ntf_Btn.textContent = 'Go Back';
    document.body.appendChild(Ntf);
  } else {
    FinalTrailer = FilterTrailer.slice(FilterTrailer.length - 1)[0];
    const Youtube = (`${YoutubeUrl}=${FinalTrailer.key}`);
    WiondowOpen(Youtube);
  }
}
const WiondowOpen = (Url) =>{
  window.open(Url, '_blank');
}


// Rating Color as Value
const RatingColor = (Class , Value) =>{
  let Color ;
  switch(true){
    case Value < 10:
      Color = '#F7CAC9'; // Light Salmon
      break;
    case Value < 20:
      Color = '#E08B8B'; // Light Coral
      break;
    case Value < 30:
      Color = '#D3D3D3'; // Light Gray
      break;
    case Value < 40:
      Color = '#BDBDBD'; // Silver
      break;
    case Value < 50:
      Color = '#A9E2A9'; // Pale Green
      break;
    case Value < 60:
      Color = '#7DB38E'; // Sea Green
      break;
    case Value < 70:
      Color = '#43AA8B'; // Darker Teal
      break;
    case Value < 80:
      Color = '#17A2B8'; // Medium Turquoise
      break;
    case Value < 90:
      Color = '#2ECC71'; // Emerald Green
      break;
    case Value === 100:
      Color = '#1A759F'; // Dark Sapphire
      break;
      default:
        Color = '#2ECC71'; // Defult Color
  }
  Class.style.background = `conic-gradient(${Color} ${Value}% , rgb(0 0 0 / 0%) 0%)`;

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

// BackDrop PAth
const BgDrop = async (Media_Type , ID) =>{
  const BaseUrl = 'https://api.themoviedb.org/3';
  try{
    const FetchBackdrop = await fetch(`${BaseUrl}/${Media_Type}/${ID}/images?api_key=${key}`);
    const BgImgs = await FetchBackdrop.json();
    const BgImg = BgImgs.backdrops.filter(Img => Img.iso_639_1 !== null);
    //console.log(BgImg);
    return BgImg;
  }catch{
    console.log('Error')
  }
}

const Trending = async () =>{
  const Trend = await FetchData(`https://api.themoviedb.org/3/trending/all/day?api_key=${key}`)
  for(const Data of Trend.results ){
    const BImgs = await BgDrop(Data.media_type , Data.id);
    // Creat Element
    // Main Item
    const Carousel_Inner = document.getElementById('Inner');
    const Item = document.createElement('div');
    Item.className = 'carousel-item';
    Carousel_Inner.appendChild(Item);
    //Background Img
    const BackdropImg = document.createElement('img')
     BackdropImg.className = 'BackdropImg';
     if(BImgs.length == 0){
      BackdropImg.src = `https://image.tmdb.org/t/p/original/${Data.backdrop_path}`
     } else {
      BackdropImg.src = `https://image.tmdb.org/t/p/original/${BImgs[Math.floor(Math.random() * BImgs.length)].file_path}`
     }
     // Defult
     // BackdropImg.src = '../images/wallpaperflare.com_wallpaper (3).jpg'
     BackdropImg.alt = BackdropImg.title = Data.title || Data.name;
     Item.appendChild(BackdropImg);
     // Poster And other Details
     const POster_Info = Automate('div' , 'Poster_Info' , Item) ;
     POster_Info.onclick = () =>{
      alert(Data.id)
    }
     // POster
    const Poster = Automate('img' , 'Poster' , POster_Info);
     Poster.src = `https://image.tmdb.org/t/p/w500/${Data.poster_path}`;
     Poster.alt = Data.title || Data.name;
     // Informations
     const Info = Automate('div' , 'Info' , POster_Info);
     // Year
     const Year = Automate('p' , 'Year' , Info);
     Year.textContent = (Data.release_date || Data.first_air_date).substring(0, 4);
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
      //console.log(Rate.className , Rate.textContent)
      RatingColor(RateBg , Rate.textContent);
      //console.log(RateBg.className , Rate.textContent);
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
      const Plot = Automate('p' , 'Plot' , Item)
      Plot.textContent = Data.overview.substring(0 , 148) + ' ...';
      Plot.textContent.length >= 148 ? Plot.style.bottom = '30%' : Plot.style.bottom = '35%';
    //console.log(Data);
    Carousel_Inner.children[0].classList.add('active');
  }
}

// cAROUSEL BTNS
  let Left_Angle = 0;
  let Right_Angle = 0;
  const Left  = document.getElementById('Next');
  const Right = document.getElementById('Prev');
  Left.onclick = () =>{
    Left_Angle += 90;
    Left.children[0].style.transform = `rotate(${Left_Angle}deg)`;
  }
  Right.onclick = () =>{
    Right_Angle -= 90;
    Right.children[0].style.transform = `rotate(${Right_Angle}deg)`;
  }

Trending();

// oWL CAROUSEL JS
const OwlCarouselz = (ClassName) =>{
  var owl = $(ClassName);
  owl.owlCarousel({
    items:6,
    loop:true,
    margin:10,
    autoplay:true,
    autoplayTimeout:1000,
    autoplayHoverPause:true
  });
}
OwlCarouselz('#owlC_Movie')
const Carouselz = async () =>{
  const CarouselBox = document.getElementById('owlC_Movie');
  const FetchApi = await fetch(`https://api.themoviedb.org/3/trending/movie/day?language=en-US` , Keyx).then( Response => Response.json() ).then( Resp => {
    return Resp;
  });
  for(const Data of FetchApi.results){
    const C_Item = Automate('div' , 'item' , CarouselBox);
    const Bimg = await BgDrop(Data.media_type , Data.id);
    const BImgFilter = Bimg.filter(imageEng => imageEng.iso_639_1 === "en");
    const C_Item_Img = Automate('img' , 'C_Item_Img' , C_Item);
    if(BImgFilter.length == 0){
      C_Item_Img.src = `https://image.tmdb.org/t/p/original/${Data.backdrop_path}`;
    } else {
      C_Item_Img.src = `https://image.tmdb.org/t/p/original/${BImgFilter[0].file_path}`;
    }
    console.log();
  }
}
Carouselz();