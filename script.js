// متغيرات عامة  
let currentUser = null;  

// التحقق من تسجيل الدخول عند تحميل الصفحة  
document.addEventListener('DOMContentLoaded', () => {  
    checkLoginStatus();  
});  

// التحقق من حالة تسجيل الدخول  
function checkLoginStatus() {  
    const savedUser = localStorage.getItem('currentUser');  
    if (savedUser) {  
        currentUser = JSON.parse(savedUser);  
        showDashboard();  
    }  
}  

// إظهار لوحة المتابعة  
function showDashboard() {  
    document.getElementById('login-section').classList.remove('active-section');  
    document.getElementById('login-section').classList.add('hidden');  
    document.getElementById('dashboard').classList.remove('hidden');  
    document.getElementById('dashboard').classList.add('active-section');  
    document.getElementById('user-name').textContent = currentUser.username;  
    loadUserProgress();  
}  

// تحميل تقدم المستخدم  
function loadUserProgress() {  
    const progress = JSON.parse(localStorage.getItem(`progress_${currentUser.username}`)) || {  
        memorize: 0,  
        review: 0,  
        prayers: Array(5).fill(false),  
        sunnah: Array(5).fill(false)  
    };  
    
    document.getElementById('daily-memorize').value = progress.memorize;  
    document.getElementById('daily-review').value = progress.review;  
}  

// معالجة نموذج تسجيل الدخول  
document.getElementById('login-form').addEventListener('submit', (e) => {  
    e.preventDefault();  
    const username = document.getElementById('username').value;  
    const password = document.getElementById('password').value;  
    
    // تحقق بسيط من كلمة المرور (في التطبيق الحقيقي يجب استخدام تحقق أكثر أماناً)  
    if (password.length === 4) {  
        currentUser = { username, password };  
        localStorage.setItem('currentUser', JSON.stringify(currentUser));  
        showDashboard();  
    } else {  
        alert('كلمة المرور يجب أن تكون 4 أرقام');  
    }  
});  

// حفظ التقدم  
document.getElementById('save-progress').addEventListener('click', () => {  
    const progress = {  
        memorize: parseInt(document.getElementById('daily-memorize').value) || 0,  
        review: parseInt(document.getElementById('daily-review').value) || 0,  
        prayers: Array.from(document.querySelectorAll('.prayer-check')).map(check => check.checked),  
        sunnah: Array.from(document.querySelectorAll('.sunnah-check')).map(check => check.checked)  
    };  
    
    localStorage.setItem(`progress_${currentUser.username}`, JSON.stringify(progress));  
    alert('تم حفظ التقدم بنجاح');  
});  

// تسجيل الخروج  
document.getElementById('logout-btn').addEventListener('click', () => {  
    localStorage.removeItem('currentUser');  
    currentUser = null;  
    document.getElementById('dashboard').classList.remove('active-section');  
    document.getElementById('dashboard').classList.add('hidden');  
    document.getElementById('login-section').classList.remove('hidden');  
    document.getElementById('login-section').classList.add('active-section');  
    document.getElementById('login-form').reset();  
});  

// الأذكار  
document.getElementById('morning-azkar').addEventListener('click', () => {  
    alert('سيتم إضافة أذكار الصباح قريباً');  
});  

document.getElementById('evening-azkar').addEventListener('click', () => {  
    alert('سيتم إضافة أذكار المساء قريباً');  
});
