$(document).ready(function() {
    getNameHeader();
    sendMessages();
    getMessages();
    getColors();
    getTime();
    getEmojis();
});


(() => {
    const firebaseConfig = {
        apiKey: "AIzaSyA5Z029X1_OS3-xOJ0qqoL3rLU109H1IS0",
        authDomain: "chambra-chat.firebaseapp.com",
        databaseURL: "https://chambra-chat.firebaseio.com",
        projectId: "chambra-chat",
        storageBucket: "chambra-chat.appspot.com",
        messagingSenderId: "894331302194",
        appId: "1:894331302194:web:24069cdc304fccab49a72b"
    };

    // Initialize Firebase
    firebase.initializeApp(firebaseConfig);

    const database = firebase.database();
})();



const getNameHeader = function(){
    let nameHeader = "";
    nameHeader += "<h2 style='color: #fff;'>" +sessionStorage.getItem('inputValue')+ "</h2>";

    $('.header-chat').append(nameHeader);
};   

const sendMessages = function(){
    $('#formMessage').submit(function(e){
        e.preventDefault();

        let name = sessionStorage.getItem('inputValue');
        let color = sessionStorage.getItem('nameColor');
        let message = $('#sendMessage').val();

        // const isHtml = (str) => !(str || '')
        //     .replace(/<([^>]+?)([^>]*?)>(.*?)<\/\1>/ig, '')
        //     .replace(/(<([^>]+)>)/ig, '')
        //     .trim();

        // if (isHtml(message)) {
        //     return false;
        // }

        let messageFormated = message.replace(/&/g, "&amp;") .replace(/</g, "&lt;") .replace(/>/g, "&gt;") .replace(/"/g, "&quot;") .replace(/'/g, "&#039;");

        $('#sendMessage').val('');

        firebase.database().ref('mensagens').push().set({
            nome: name,
            cor: color,
            mensagem: messageFormated,
            tempo: getTime()
        });
    });
};

const getMessages = function(){
    const messagesRef = firebase.database().ref('mensagens');
    messagesRef.on('child_added', function(data) {  
    
        let nameUserCurrent = sessionStorage.getItem('inputValue');
    
        // if (data.val().tempo == getTime()) {
            if (data.val().nome == nameUserCurrent) {

                let mensagemRight = "";
                mensagemRight += "<div style='display: flex; justify-content: flex-end; margin-bottom: 1rem;'>"
                mensagemRight += "<div style='max-width: 95%; position: relative;'>"
                mensagemRight += "<div style='background: #fff; position: relative; border-radius: .8rem; box-shadow: 0px 2px 3px 0px rgba(13, 21, 75, 0.3);'>"
                mensagemRight += "<div style='padding: 6px 7px 4px 9px;'>"
                // mensagemRight += "<div style='display: flex; max-width: 100%; line-height: 22px; margin-bottom: .4rem; justify-content: flex-end;'>"
                // mensagemRight += "<span style='margin-left: -2px; padding-left: 2px; word-wrap: break-word; color: #2860b3;'>" +data.val().nome+ "</span>"
                // mensagemRight += "</div>"

                mensagemRight += "<div>"
                mensagemRight += "<div style='position: relative; word-wrap: break-word;'>"
                mensagemRight += "<span>"
                mensagemRight += "<span>" +data.val().mensagem+ "</span>"
                mensagemRight += "</span>"
                mensagemRight += "</div>"
                mensagemRight += "</div>"

                mensagemRight += "<div style='display: block; text-align: right;'>"
                mensagemRight += "<span>"
                mensagemRight += "<span style='font-size: .7rem; color: rgba(0,0,0,0.5);'>" +data.val().tempo+ "</span>"
                mensagemRight += "</span>"
                mensagemRight += "</div>"
                mensagemRight += "</div>"
                mensagemRight += "</div>"
                mensagemRight += "</div>"
                mensagemRight += "</div>"
    
                $('.content-chat').append(mensagemRight);
            } else {

                let mensagemLeft = "";
                mensagemLeft += "<div style='display: flex; justify-content: flex-start; margin-bottom: 1rem;'>"
                mensagemLeft += "<div style='max-width: 95%; position: relative;'>"
                mensagemLeft += "<div style='background: #fff; position: relative; border-radius: .8rem; box-shadow: 0px 2px 3px 0px rgba(13, 21, 75, 0.3);'>"
                mensagemLeft += "<div style='padding: 6px 7px 4px 9px;'>"
                mensagemLeft += "<div style='display: inline-flex; max-width: 100%; line-height: 22px; margin-bottom: .4rem;'>"
                mensagemLeft += "<span style='margin-left: -2px; padding-left: 2px; word-wrap: break-word; color:" +data.val().cor+ " '>" +data.val().nome+ "</span>"
                mensagemLeft += "</div>"

                mensagemLeft += "<div>"
                mensagemLeft += "<div style='position: relative; word-wrap: break-word;'>"
                mensagemLeft += "<span>"
                mensagemLeft += "<span>" +data.val().mensagem+ "</span>"
                mensagemLeft += "</span>"
                mensagemLeft += "</div>"
                mensagemLeft += "</div>"

                mensagemLeft += "<div style='display: block; text-align: right;'>"
                mensagemLeft += "<span>"
                mensagemLeft += "<span style='font-size: .7rem; color: rgba(0,0,0,0.5);'>" +data.val().tempo+ "</span>"
                mensagemLeft += "</span>"
                mensagemLeft += "</div>"
                mensagemLeft += "</div>"
                mensagemLeft += "</div>"
                mensagemLeft += "</div>"
                mensagemLeft += "</div>"
    

                $('.content-chat').append(mensagemLeft);
            }
        // }

        let chatScroll = document.getElementById('contentChat');
        chatScroll.scrollTo(0,chatScroll.scrollHeight);
    });
};

const getTime = function(){
    let data = new Date();
    let hora = data.getHours(); 
    let min  = data.getMinutes();

    if (hora < 10) {
        hora = '0' + hora;
    }

    if (min < 10) {
        min = '0' + min;
    }

    let time = hora +':'+ min;

    return time;
};

// MY CODE
// const getEmojis = function(){
//     $('#btnEmoji').click(function(){
//         $('.emojis').toggle();

//         $('.btn-sm').click(function(){
//             var emoji = $(this).text();
//             $('#sendMessage').val($('#sendMessage').val() + emoji);
//         });
//     });

//     const emojis = ['&#x1F600', '&#x1F607'];

//     btnEmoji = " ";
//     btnEmoji += "<button type='button' class='btn btn-sm'>" + emojis[0] + "</button>"

//     $('.emojis').append(btnEmoji);
// };


const getEmojis = function(){
    const btn = document.getElementById('btnEmoji');
    const input = document.getElementById('sendMessage');

    const picker = new EmojiButton({
        position: 'top',
        autoHide: false,
        showVariants: false
    });

    picker.on('emoji', function(emoji){
        input.value += emoji;
    });

    btn.addEventListener('click', function(){
        picker.pickerVisible ? picker.hidePicker() : picker.showPicker(btn);
    });
};