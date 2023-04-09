console.log('%c여길 어떻게 알았지?', 'background-color: #87CEEB; color: white; font-size: 50px;');
console.log('%c쨋든 이스터에그 들켰네요', ' color: white; font-size: 25px;');
//이미지 우클릭 방지(불펌)
document.addEventListener("contextmenu", e => {
    e.target.matches("img") && e.preventDefault();
    });
   
//Widget

// 팝업 버튼 클릭 시 팝업 띄우기
const popupBtn = document.getElementById('popupBtn');
popupBtn.addEventListener('click', function() {
  const popup = document.getElementById('popup');
  popup.style.display = 'block';
  document.body.classList.add('popup-open');
  const background = document.createElement('div');
  background.classList.add('popup-background');
  document.body.appendChild(background);
});

// 닫기 버튼 클릭 시 팝업 닫기
const closeBtn = document.getElementById('closeBtn');
closeBtn.addEventListener('click', function() {
  const popup = document.getElementById('popup');
  popup.style.display = 'none';
  document.body.classList.remove('popup-open');
  const background = document.querySelector('.popup-background');
  background.parentNode.removeChild(background);
});


// 제출 버튼 클릭 시 디스코드 웹훅으로 임베드, 메시지 전송
const submitBtn = document.getElementById('submitBtn');
submitBtn.addEventListener('click', function() {
  const webhookUrl = 'https://discord.com/api/webhooks/xxxxx/yyyyy'; // 디스코드 웹훅 URL 입력
  var message = {
    content: ''
  };
  
  const nicknameInput = document.getElementById('nickname');
  if (nicknameInput.value) {
    message.content += `신고자: ${nicknameInput.value}`;
  } else {
    message.content += '신고자: 익명';
  }
  var pageUrl = window.location.href;
  var content = '<@616570697875193866> <@447934468603379724>';
  var title = '웹페이지 오류 신고 접수!';
  var description = '익명 사용자가 `' + pageUrl + '`에서 오류가 발생했다고 신고했습니다. 확인해주세요!\n\n[**접속하기**](' + pageUrl + ')';
  var footer = 'Nginx';
  fetch(webhookUrl, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({
        content: content,
        embeds: [
        {
          title: title,
          description: description,
          footer: {
            text: footer,
            icon_url: 'https://cdn.icon-icons.com/icons2/2107/PNG/512/file_type_nginx_icon_130305.png'
          }
        }
      ]
    })
  })
  .then(response => {
    if (!response.ok) {
      throw new Error('Failed to send webhook');
    }
    const popup = document.getElementById('popup');
    popup.style.display = 'none';
    alert('오류 신고가 완료되었습니다.');
  })
  .catch(error => {
    console.error(error);
    alert('오류 신고에 실패했습니다.');
  });
});