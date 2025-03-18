// العناصر التي سنحتاجها  
const surahSelect = document.getElementById('surah');  
const ayahFromInput = document.getElementById('ayahFrom');  
const ayahToInput = document.getElementById('ayahTo');  
const saveButton = document.getElementById('saveReading');  
const progressDiv = document.getElementById('progress');  

// قائمة السور مع عدد آياتها  
const surahs = [  
    { name: "الفاتحة", ayahs: 7 },  
    { name: "البقرة", ayahs: 286 },  
    { name: "آل عمران", ayahs: 200 },  
    // يمكنك إضافة باقي السور هنا  
];  

// إضافة السور إلى القائمة المنسدلة  
function populateSurahs() {  
    surahSelect.innerHTML = '';  
    surahs.forEach((surah, index) => {  
        const option = document.createElement('option');  
        option.value = index + 1;  
        option.textContent = surah.name;  
        surahSelect.appendChild(option);  
    });  
}  

// حفظ القراءة  
function saveReading() {  
    const surahIndex = parseInt(surahSelect.value) - 1;  
    const fromAyah = parseInt(ayahFromInput.value);  
    const toAyah = parseInt(ayahToInput.value);  
    
    // التحقق من صحة المدخلات  
    if (!fromAyah || !toAyah || fromAyah > toAyah) {  
        alert('الرجاء إدخال أرقام الآيات بشكل صحيح');  
        return;  
    }  
    
    if (toAyah > surahs[surahIndex].ayahs) {  
        alert('رقم الآية أكبر من عدد آيات السورة');  
        return;  
    }  
    
    // حفظ القراءة في localStorage  
    const readings = JSON.parse(localStorage.getItem('readings') || '[]');  
    readings.push({  
        surah: surahIndex + 1,  
        from: fromAyah,  
        to: toAyah,  
        date: new Date().toISOString()  
    });  
    localStorage.setItem('readings', JSON.stringify(readings));  
    
    // تحديث عرض التقدم  
    showProgress();  
    
    // تفريغ الحقول  
    ayahFromInput.value = '';  
    ayahToInput.value = '';  
}  

// عرض التقدم  
function showProgress() {  
    const readings = JSON.parse(localStorage.getItem('readings') || '[]');  
    if (readings.length === 0) {  
        progressDiv.textContent = 'لم يتم تسجيل أي قراءة بعد';  
        return;  
    }  
    
    let html = '<ul>';  
    readings.forEach(reading => {  
        const surahName = surahs[reading.surah - 1].name;  
        const date = new Date(reading.date).toLocaleDateString('ar');  
        html += `  
            <li>  
                قراءة ${surahName} من آية ${reading.from} إلى ${reading.to}  
                <br>  
                <small>بتاريخ: ${date}</small>  
            </li>  
        `;  
    });  
    html += '</ul>';  
    progressDiv.innerHTML = html;  
}  

// تهيئة التطبيق  
function init() {  
    populateSurahs();  
    showProgress();  
    saveButton.addEventListener('click', saveReading);  
}  

// بدء التطبيق  
init();
