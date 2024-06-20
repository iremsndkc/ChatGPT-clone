//! HTML'den gelenler
const chatInput = document.querySelector("#chat-input");
const sendButton = document.querySelector("#send-btn");
const defaultText = document.querySelector(".default-text");
const chatContainer = document.querySelector(".chat-container");
const themeButton = document.querySelector("#theme-btn");
const deleteButton = document.querySelector("#delete-btn");
let userText = null;
//* gönderdiğimiz html ve class ismine göre bize bir html oluşturur.
const createElement = (html , className) => {
    //* yeni bir div oluştur.
    const chatDiv = document.createElement("div");
    //* bu oluşturduğumuz dive chat ve dışardan paramere olarak gelen classı ver.
    chatDiv.classList.add("chat", className); 
    //* oluşturduğumuz divin içeriine dışardan parametre olarak gelen html parametresini ekle.
    chatDiv.innerHTML = html;

    return chatDiv;
}


const getChatResponse = async (incomingChatDiv) => {
    //* API'den gelecek cevabı içerisine aktaracığımız bir p etiketi oluşturduk.
    const pElement = document.createElement("p");
    console.log(pElement);
    //* 1.adım: URL' yi tanımla.
    const url = "https://chatgpt-42.p.rapidapi.com/conversationgpt4-2";
    //*2.adım: options tanımla.
    const options = {
        method: 'POST', //* atacağımız istediğin tipidir.
        //* api keyimiz bulunur.
        headers: {
            'x-rapidapi-key': '9691cc5db6mshc21dc434e16cfdep1313a3jsn4ac5cdbc02f3',
            'x-rapidapi-host': 'chatgpt-42.p.rapidapi.com',
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(
            {
                messages: [
                    {
                        role: 'user',
                        content: `${userText}`,
                    }
                ],
                system_prompt: '',
                temperature: 0.9,
                top_k: 5,
                top_p: 0.9,
                max_tokens: 256,
                web_access: false
            }
        )
    };
//    //*3.adım: API'ye istek at.
//    fetch(url, options)
//    //* Gelen cevabı yakala ve jsona çevir
 //   .then((res) => res.json())
 //   //* jsona çevrilmiş veriyi yakalayıp işlemler gerçekleştirebiliriz
 //   .then((data) => console.log(data.result))
//    //* Hata varsa yakalar
//    .catch((error) => console.error(error));


try {
    //* APİ' ye urli ve optionsu kullanarak istek at ve beklle.
    const response = await fetch(url , options);
    //* gelen cevabı jsona çevir ve bekle.
    const result = await response.json();
    //* APİden gelen cevabı oluşturduğumuz p etiketinin içerisine aktardık.
    pElement.innerHTML = result.result;
} catch (error) {
    console.log(error);
}
console.log(incomingChatDiv);
//*animasyonu kaldırabilmek ile seçtik ve ekrandan remove ile kaldırdık
incomingChatDiv.querySelector(".typing-animation").remove();
//*APİ'den gelen cevabı ekrana aktarabilmek için seçip değişkene aktardık.
//const detailDiv = incomingChatDiv.querySelector(".chat-details");
//* bu detail içerisine oluşturduğumuz p elemtini aktardık.
//detailDiv.appendChild(pElement);

incomingChatDiv.querySelector(".chat-details").appendChild(pElement);
chatInput.value = null;
};



const showTypingAnimation = () => {
    const html =`
    <div class="chat-content">
        <div class="chat-details">
            <img src="img/chatbotlogo.webp" alt="">
                <div class="typing-animation">
                    <div class="typing-dot" style="--delay: 0.2s"></div>
                    <div class="typing-dot" style="--delay: 0.3s"></div>
                    <div class="typing-dot" style="--delay: 0.4s"></div>
                </div>
        </div>
    </div>
    
    `;
   const incomingChatDiv = createElement(html , "incoming");
   chatContainer.appendChild(incomingChatDiv);
   getChatResponse(incomingChatDiv);
   
}

const handleOutGoingChat =() => {
    userText = chatInput.value.trim(); //* ınputun içerisinde bulunan değeri al ve fazladan bulunan boşlukları sil.
    //* ınputun içerisinde veri yoksa foonksiyonu burada durddur.
    if (!userText) {
        alert("bir veri giriniz");
        return;
    }
    const html = `
    <div class="chat-content">
        <div class="chat-details">
            <img src="img/userprofil.jpeg"   alt="">
            <p></p>
        </div>
    </div>
    `;
    //* kullanıcının mesajını içeren bir div olutur ve bunu chatcontainer yapısına ekle.
   const outgoingChatDiv = createElement(html, "outgoing");
   defaultText.remove();
   outgoingChatDiv.querySelector("p").textContent = userText;
   chatContainer.appendChild(outgoingChatDiv);
   setTimeout(showTypingAnimation, 500);
};





//! Olay izleyicileri
sendButton.addEventListener("click", handleOutGoingChat);
//* textarea içerisinde klavyeden herhangibir tuşa bastığımız anda bu olay izleyicisi çalışır.
chatInput.addEventListener("keydown",(e)=> {
    //*klavyeden enter tuşuna basıldığı anda habdleoutgoingchat fonksiyonunu çalıştır.
    console.log(e);
    if (e.key === "Enter") {
        handleOutGoingChat();
    }
});
//*themebuttona her tıkladığımızda bodye light classını ekle ve çıkar.
themeButton.addEventListener("click", () => {
    document.body.classList.toggle("light-mode");
console.log(themeButton.inner);
//* body light-mode classını içeriyorsa themeButton içerisindeki yazıyı dark_mode yap.İçermiyorsa light_mode yap.
themeButton.innerText = document.body.classList.contains("light-mode")
? "dark_mode"
: "light_mode";
});


//* Sil butonuna tıkladığımızda chat-container divini sil ve yerine defaultTexti aktar.
deleteButton.addEventListener("click", () => {
    //* Confirm ile ekrana bir mesaj bastırdık.Confirm bize true ve false değer dönderir.
    //* Tamam tuşuna basıldığında true dönderir.
    //* İptal tuşuna basıldığında false dönderir.
    if (confirm("Tüm sohbetleri silmek istediğinize emin misiniz?")) {
      chatContainer.remove();
    }
    const defaultText = `
    <div class="default-text">
        <h1>ChatMERS</h1>
    </div>
    <div class="chat-container"></div>
        <div class="typing-container">
            <div class="typing-content">
                <div class="typing-textarea">
                    <textarea
                    id="chat-input"
                    placeholder="Aratmak istediğiniz veriyi giriniz..."
                    ></textarea>
                    <span class="material-symbols-outlined" id="send-btn"> send </span>
            </div>
            <div class="typing-controls">
                <span class="material-symbols-outlined" id="theme-btn">
                light_mode
                </span>
                <span class="material-symbols-outlined" id="delete-btn">
                delete
                </span>
            </div>
        </div>
    </div>
  `;

  document.body.innerHTML = defaultText;
});