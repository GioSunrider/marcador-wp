// En lugar de localStorage, usar la API de Electron
async function saveData() {
    const data = {
        localScore,
        visitorScore,
        localTimeoutsUsed,
        visitorTimeoutsUsed,
        possessionTime,
        gameTimerTime,
        isTimersRunning,
        currentPeriod,
        periodDuration,
        preset30Value,
        preset20Value,
        activePreset,
        localName: document.getElementById('localName').textContent,
        visitorName: document.getElementById('visitorName').textContent,
        localLogo: document.getElementById('localLogo').innerHTML,
        visitorLogo: document.getElementById('visitorLogo').innerHTML,
        localNameInput: document.getElementById('localNameInput').value,
        visitorNameInput: document.getElementById('visitorNameInput').value,
        localLogoInput: document.getElementById('localLogoInput').value,
        visitorLogoInput: document.getElementById('visitorLogoInput').value,
        publicTitleInput: document.getElementById('publicTitleInput').value
    };
    
    if (window.electronAPI) {
        await window.electronAPI.saveData(data);
    } else {
        // Fallback para versión web
        localStorage.setItem('waterpolo_control_panel', JSON.stringify(data));
    }
}

async function loadSavedData() {
    let data;
    
    if (window.electronAPI) {
        data = await window.electronAPI.loadData();
    } else {
        // Fallback para versión web
        const savedData = localStorage.getItem('waterpolo_control_panel');
        data = savedData ? JSON.parse(savedData) : null;
    }
    
    if (data) {
        // Cargar datos como antes...
        localScore = data.localScore || 0;
        visitorScore = data.visitorScore || 0;
        // ... resto del código de carga
    }
}