//variables
const listaTweets=document.getElementById('lista-tweets');





//event listenner
eventListeners();

function eventListeners(){
    //cuando se envia el formulario
    document.querySelector('#formulario').addEventListener('submit',agregarTweet);

    //borrar tweet
    listaTweets.addEventListener('click',borrarTweet);
    //contenido cargado
    document.addEventListener('DOMContentLoaded',localStorageListo);
}





//funciones





//añadir tweet del 
function agregarTweet(e){
    e.preventDefault();
    //leer el valor de text area
    const tweet=document.getElementById('tweet').value;
    //crear boton de eliminar
    const botonBorrar=document.createElement('a');
    botonBorrar.classList='borrar-tweet';
    botonBorrar.innerText='x';

    //crear elemento  y añadirle el contenido a la lista
    const li= document.createElement('li');
    li.innerText=tweet;
    //añade el boton de borrar tweet
    li.appendChild(botonBorrar);
    //añade el tweet a la lista
    listaTweets.appendChild(li);

    //añadir al localStorage
    agregarTweetLocalStorage(tweet);

    console.log(tweet);
}
//elimina el tweet del dom
function borrarTweet(e){
  e.preventDefault();//previene accion por defecto
  if(e.target.className=== 'borrar-tweet'){
    //instrucion eliminar
    e.target.parentElement.remove();
    borrarTweetsLocalStorage(e.target.parentElement.innerText);  
  
  }
}
function localStorageListo(){
  let tweets;
  //muestra los arrays del local storage
  tweets=obtenerTweetsLocalStorage();
  tweets.forEach(tweets => {
    const  botonBorrar=document.createElement('a');
      botonBorrar.classList='borrar-tweet';
      botonBorrar.innerText='x';
  
      //crear elemento  y añadirle el contenido a la lista
      const li= document.createElement('li');
      li.innerText=tweets;
      //añade el boton de borrar tweet
      li.appendChild(botonBorrar);
      //añade el tweet a la lista
      listaTweets.appendChild(li);
    
  });
}

//agrgea el tweet a local Storage
function agregarTweetLocalStorage(tweet){
    let tweets;
    tweets= obtenerTweetsLocalStorage();
    //añadir un nuevo tweet
    tweets.push(tweet);
    //convertir de string a arreglo para local storage
    localStorage.setItem('tweets',JSON.stringify(tweets));    //agrgar al local storage
}
//comprueba que hay elementos en local storage, retorna un arreglo
function obtenerTweetsLocalStorage(){
  let tweets;
  //revisamos los valores del local storage
  if(localStorage.getItem('tweets')=== null){
    tweets=[];
  }
  else {
    tweets= JSON.parse(localStorage.getItem('tweets'));
  }
  return tweets;
}
//mostrar datos del localStorage en la lista

//elimiar tweet de local storage
function borrarTweetsLocalStorage(tweet){
  let tweets, tweetBorrar;
  //elimina la  x del tweet
  tweetBorrar=tweet.substring(0,tweet.length-1);
  tweets=obtenerTweetsLocalStorage();

  tweets.forEach((tweet,index) =>{
    if(tweetBorrar===tweet){
      tweets.splice(index,1);
    }
  });
  localStorage.setItem('tweets',JSON.stringify(tweets));
}
