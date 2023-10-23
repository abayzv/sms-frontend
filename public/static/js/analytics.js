function getFullUrl() {
    return window.location.href;
  }

  function getDate() {
    const date = new Date();
    const year = date.getFullYear();
    const month = date.getMonth() + 1;
    const dayOfMonth = date.getDate();
    const dayOfWeek = date.getDay();

    return {
      year,
      month,
      dayOfMonth,
      dayOfWeek
    };
  }

function isUniqueSession() {
    const sessionId = localStorage.getItem('session_id');
    const sessionStartTime = localStorage.getItem('session_start_time');

    if (!sessionId || !sessionStartTime) {
    return true;
    }

    return false;
}

function getUserSystemInfo() {
    const userAgent = window.navigator.userAgent;
    const platform = window.navigator.platform;
    const language = window.navigator.language;
    const screenResolution = `${window.screen.width}x${window.screen.height}`;
    const timezone = Intl.DateTimeFormat().resolvedOptions().timeZone;
  
    return {
      userAgent,
      platform,
      screenResolution,
      timezone,
      language
    };
  }

// Fungsi untuk menghasilkan ID sesi unik
function generateUniqueSessionId() {
    // Implementasi Anda untuk membuat ID sesi
  }
  
  // Fungsi untuk memulai atau melanjutkan sesi
  function startOrResumeSession() {
    const sessionId = localStorage.getItem('session_id');
    const sessionStartTime = localStorage.getItem('session_start_time');
  
    if (!sessionId || !sessionStartTime) {
      // Buat ID sesi baru jika belum ada
      const newSessionId = generateUniqueSessionId();
      const currentTime = new Date().getTime();
      localStorage.setItem('session_id', newSessionId);
      localStorage.setItem('session_start_time', currentTime);
    }
  }
  
  // Memanggil fungsi untuk memulai atau melanjutkan sesi
  startOrResumeSession();
  
  // Fungsi untuk menghitung dan melaporkan durasi sesi
function reportSessionDuration() {
    const sessionStartTime = parseInt(localStorage.getItem('session_start_time'));
    if (sessionStartTime) {
      const currentTime = new Date().getTime();
      const sessionDuration = currentTime - sessionStartTime;
      
      return sessionDuration;
    }
  }
  
  // Memanggil fungsi untuk menghitung dan melaporkan durasi sesi
  reportSessionDuration();

function jsonToQueryString(json) {
    return Object.keys(json).map(function(key) {
      // if key is nested object then call the function recursively
      if (typeof json[key] === 'object') {
        return jsonToQueryString(json[key]);
      }
      return encodeURIComponent(key) + '=' +
        encodeURIComponent(json[key]);
    }).join('&');
  }

const data = {
    url: getFullUrl(),
    date: getDate(),
    uniqueSession: isUniqueSession(),
    userSystemInfo: getUserSystemInfo(),
    duration: reportSessionDuration()
};

const queryString = jsonToQueryString(data);

window.onload = function() {
  //  on change pathname
  window.onpopstate = function(event) {
    console.log('location: ' + document.location + ', state: ' + JSON.stringify(event.state));
  };
  };

  

// Path: /static/js/analytics.js