// ===== Font Viewer App =====
(function () {
    'use strict';

    // --- i18n Translations ---
    const translations = {
        en: {
            // Header
            fontNotLoaded: 'No font loaded',
            toggleTheme: 'Toggle theme',
            // Upload
            uploadTitle: 'Drag and drop a font file here',
            uploadSubtitle: 'or click to select a file',
            uploadFormats: 'Supported formats: .ttf, .otf, .woff, .woff2',
            // Toolbar
            toolbarSize: 'Size',
            toolbarLetterSpacing: 'Letter spacing',
            toolbarLineHeight: 'Line height',
            toolbarTextColor: 'Text color',
            toolbarBg: 'Background',
            uploadAnother: 'Upload another',
            // Tabs
            tabPreview: 'Preview',
            tabParagraph: 'Paragraph',
            tabWaterfall: 'Waterfall',
            tabGlyphs: 'Glyphs',
            tabInfo: 'Info',
            // Preview
            hintEdit: 'Click on text to edit',
            previewDefaultText: 'The quick brown fox jumps over the lazy dog.\n0123456789 !@#$%^&*()',
            // Paragraph
            paragraphSample1: 'Typography is the art of arranging type to make written language legible, readable and appealing when displayed. A good font should be not only beautiful, but also comfortable to read.',
            paragraphSample2: 'The arrangement of type involves selecting typefaces, point sizes, line lengths, line-spacing, and letter-spacing. It also involves adjusting the display of text to create visual harmony.',
            paragraphCyrillicUpper: 'АБВГДЕЁЖЗИЙКЛМНОПРСТУФХЦЧШЩЪЫЬЭЮЯ',
            paragraphCyrillicLower: 'абвгдеёжзийклмнопрстуфхцчшщъыьэюя',
            // Glyphs
            glyphSearchPlaceholder: 'Search glyph...',
            catAll: 'All glyphs',
            catLatin: 'Latin',
            catCyrillic: 'Cyrillic',
            catNumbers: 'Numbers',
            catPunctuation: 'Punctuation',
            catSymbols: 'Symbols',
            glyphChar: 'Character:',
            // Info
            loading: 'Loading...',
            infoFileName: 'File name',
            infoFormat: 'Format',
            infoFontFamily: 'Font family',
            infoDateLoaded: 'Date loaded',
            infoCyrillicSupport: 'Cyrillic support',
            infoLatinSupport: 'Latin support',
            infoYes: '✅ Yes',
            infoNo: '❌ No',
            infoUnits: 'units',
            // Waterfall
            waterfallSample: 'The quick brown fox jumps over the lazy dog.',
            // Toasts
            toastUnsupported: '❌ Unsupported format. Use: TTF, OTF, WOFF, WOFF2',
            toastLoaded: '✅ Font loaded',
            toastError: '❌ Font loading error',
        },
        ru: {
            // Header
            fontNotLoaded: 'Шрифт не загружен',
            toggleTheme: 'Переключить тему',
            // Upload
            uploadTitle: 'Перетащите файл шрифта сюда',
            uploadSubtitle: 'или нажмите для выбора файла',
            uploadFormats: 'Поддерживаемые форматы: .ttf, .otf, .woff, .woff2',
            // Toolbar
            toolbarSize: 'Размер',
            toolbarLetterSpacing: 'Межбуквенное',
            toolbarLineHeight: 'Межстрочное',
            toolbarTextColor: 'Цвет текста',
            toolbarBg: 'Фон',
            uploadAnother: 'Загрузить другой',
            // Tabs
            tabPreview: 'Предпросмотр',
            tabParagraph: 'Параграф',
            tabWaterfall: 'Водопад',
            tabGlyphs: 'Символы',
            tabInfo: 'Информация',
            // Preview
            hintEdit: 'Кликните на текст для редактирования',
            previewDefaultText: 'Съешь ещё этих мягких французских булок, да выпей чаю.\n0123456789 !@#$%^&*()',
            // Paragraph
            paragraphSample1: 'Типографика — это искусство оформления текста с использованием различных шрифтов, размеров и пропорций. Хороший шрифт должен быть не только красивым, но и удобным для чтения.',
            paragraphSample2: 'Типографическое оформление включает выбор гарнитур, кеглей, длины строк, межстрочного и межбуквенного расстояния. Оно также включает настройку отображения текста для создания визуальной гармонии.',
            paragraphCyrillicUpper: 'АБВГДЕЁЖЗИЙКЛМНОПРСТУФХЦЧШЩЪЫЬЭЮЯ',
            paragraphCyrillicLower: 'абвгдеёжзийклмнопрстуфхцчшщъыьэюя',
            // Glyphs
            glyphSearchPlaceholder: 'Поиск символа...',
            catAll: 'Все символы',
            catLatin: 'Латиница',
            catCyrillic: 'Кириллица',
            catNumbers: 'Цифры',
            catPunctuation: 'Пунктуация',
            catSymbols: 'Символы',
            glyphChar: 'Символ:',
            // Info
            loading: 'Загрузка...',
            infoFileName: 'Имя файла',
            infoFormat: 'Формат',
            infoFontFamily: 'Семейство шрифта',
            infoDateLoaded: 'Дата загрузки',
            infoCyrillicSupport: 'Поддержка кириллицы',
            infoLatinSupport: 'Поддержка латиницы',
            infoYes: '✅ Да',
            infoNo: '❌ Нет',
            infoUnits: 'единиц',
            // Waterfall
            waterfallSample: 'Съешь ещё этих мягких французских булок, да выпей чаю.',
            // Toasts
            toastUnsupported: '❌ Неподдерживаемый формат. Используйте: TTF, OTF, WOFF, WOFF2',
            toastLoaded: '✅ Шрифт загружен',
            toastError: '❌ Ошибка загрузки шрифта',
        }
    };

    // --- State ---
    let loadedFontName = '';
    let loadedFontFamily = 'UploadedFont';
    let currentTab = 'preview';
    let currentLang = 'en';

    // --- DOM Elements ---
    const uploadSection = document.getElementById('uploadSection');
    const previewSection = document.getElementById('previewSection');
    const uploadArea = document.getElementById('uploadArea');
    const fontFileInput = document.getElementById('fontFileInput');
    const fontNameDisplay = document.getElementById('fontNameDisplay');
    const themeToggle = document.getElementById('themeToggle');
    const langToggle = document.getElementById('langToggle');
    const langLabel = document.getElementById('langLabel');

    const fontSizeSlider = document.getElementById('fontSizeSlider');
    const fontSizeValue = document.getElementById('fontSizeValue');
    const letterSpacingSlider = document.getElementById('letterSpacingSlider');
    const letterSpacingValue = document.getElementById('letterSpacingValue');
    const lineHeightSlider = document.getElementById('lineHeightSlider');
    const lineHeightValue = document.getElementById('lineHeightValue');
    const textColorPicker = document.getElementById('textColorPicker');
    const bgColorPicker = document.getElementById('bgColorPicker');
    const uploadNewBtn = document.getElementById('uploadNewBtn');

    const previewText = document.getElementById('previewText');
    const previewCard = document.getElementById('previewCard');
    const paragraphText = document.getElementById('paragraphText');
    const paragraphCard = document.getElementById('paragraphCard');
    const waterfallText = document.getElementById('waterfallText');
    const waterfallCard = document.getElementById('waterfallCard');
    const glyphsGrid = document.getElementById('glyphsGrid');
    const glyphSearch = document.getElementById('glyphSearch');
    const glyphCategory = document.getElementById('glyphCategory');
    const glyphDetail = document.getElementById('glyphDetail');
    const glyphDetailChar = document.getElementById('glyphDetailChar');
    const glyphInfoChar = document.getElementById('glyphInfoChar');
    const glyphInfoUnicode = document.getElementById('glyphInfoUnicode');
    const glyphInfoHtml = document.getElementById('glyphInfoHtml');
    const glyphDetailClose = document.getElementById('glyphDetailClose');
    const infoGrid = document.getElementById('infoGrid');

    const tabs = document.querySelectorAll('.tab');
    const tabContents = document.querySelectorAll('.tab-content');

    // --- i18n helper ---
    function t(key) {
        return translations[currentLang][key] || translations['en'][key] || key;
    }

    function applyTranslations() {
        // data-i18n → textContent
        document.querySelectorAll('[data-i18n]').forEach(el => {
            const key = el.getAttribute('data-i18n');
            // Don't overwrite fontNameDisplay if a font is loaded
            if (el.id === 'fontNameDisplay' && loadedFontName) return;
            el.textContent = t(key);
        });

        // data-i18n-placeholder → placeholder
        document.querySelectorAll('[data-i18n-placeholder]').forEach(el => {
            const key = el.getAttribute('data-i18n-placeholder');
            el.placeholder = t(key);
        });

        // data-i18n-title → title
        document.querySelectorAll('[data-i18n-title]').forEach(el => {
            const key = el.getAttribute('data-i18n-title');
            el.title = t(key);
        });

        // Update HTML lang attribute
        document.documentElement.lang = currentLang === 'ru' ? 'ru' : 'en';

        // Update page title
        document.title = currentLang === 'ru' ? 'Font Viewer — Просмотр шрифтов' : 'Font Viewer — Preview Fonts';

        // If preview is active, regenerate dynamic content
        if (!previewSection.classList.contains('hidden')) {
            generateWaterfall();
            generateInfo();
        }
    }

    // --- Language Toggle ---
    function initLang() {
        const saved = localStorage.getItem('fontviewer-lang');
        if (saved && translations[saved]) {
            currentLang = saved;
        }
        // Update the toggle button to show the OTHER language
        langLabel.textContent = currentLang === 'en' ? 'RU' : 'EN';
        applyTranslations();
    }

    langToggle.addEventListener('click', () => {
        currentLang = currentLang === 'en' ? 'ru' : 'en';
        localStorage.setItem('fontviewer-lang', currentLang);
        // Button shows the language you can SWITCH TO
        langLabel.textContent = currentLang === 'en' ? 'RU' : 'EN';
        applyTranslations();
    });

    // --- Theme ---
    function initTheme() {
        const saved = localStorage.getItem('fontviewer-theme');
        if (saved === 'light') {
            document.documentElement.setAttribute('data-theme', 'light');
            textColorPicker.value = '#1a1a2e';
            bgColorPicker.value = '#f5f3ff';
        }
    }

    themeToggle.addEventListener('click', () => {
        const isLight = document.documentElement.getAttribute('data-theme') === 'light';
        if (isLight) {
            document.documentElement.removeAttribute('data-theme');
            localStorage.setItem('fontviewer-theme', 'dark');
            textColorPicker.value = '#ffffff';
            bgColorPicker.value = '#0f0f23';
        } else {
            document.documentElement.setAttribute('data-theme', 'light');
            localStorage.setItem('fontviewer-theme', 'light');
            textColorPicker.value = '#1a1a2e';
            bgColorPicker.value = '#f5f3ff';
        }
        applyStyles();
    });

    // --- Upload ---
    uploadArea.addEventListener('click', () => fontFileInput.click());

    uploadArea.addEventListener('dragover', (e) => {
        e.preventDefault();
        uploadArea.classList.add('drag-over');
    });

    uploadArea.addEventListener('dragleave', () => {
        uploadArea.classList.remove('drag-over');
    });

    uploadArea.addEventListener('drop', (e) => {
        e.preventDefault();
        uploadArea.classList.remove('drag-over');
        const file = e.dataTransfer.files[0];
        if (file) handleFontFile(file);
    });

    fontFileInput.addEventListener('change', (e) => {
        const file = e.target.files[0];
        if (file) handleFontFile(file);
    });

    uploadNewBtn.addEventListener('click', () => {
        fontFileInput.value = '';
        fontFileInput.click();
    });

    function handleFontFile(file) {
        const validExtensions = ['.ttf', '.otf', '.woff', '.woff2'];
        const ext = '.' + file.name.split('.').pop().toLowerCase();

        if (!validExtensions.includes(ext)) {
            showToast(t('toastUnsupported'));
            return;
        }

        loadedFontName = file.name;
        const reader = new FileReader();

        reader.onload = function (e) {
            const fontData = e.target.result;

            // Create @font-face
            const fontFace = new FontFace(loadedFontFamily, fontData);
            fontFace.load().then(function (loaded) {
                document.fonts.add(loaded);
                activatePreview();
                showToast(t('toastLoaded') + ' — «' + loadedFontName + '»');
            }).catch(function (err) {
                console.error('Font load error:', err);
                showToast(t('toastError'));
            });
        };

        reader.readAsArrayBuffer(file);
    }

    function activatePreview() {
        uploadSection.classList.add('hidden');
        previewSection.classList.remove('hidden');

        fontNameDisplay.textContent = loadedFontName;
        fontNameDisplay.classList.add('loaded');

        applyStyles();
        generateWaterfall();
        generateGlyphs();
        generateInfo();
    }

    // --- Styles ---
    function applyStyles() {
        const fontSize = fontSizeSlider.value + 'px';
        const letterSpacing = letterSpacingSlider.value + 'px';
        const lineHeight = (lineHeightSlider.value / 100);
        const textColor = textColorPicker.value;
        const bgColor = bgColorPicker.value;

        // Preview
        previewText.style.fontFamily = `"${loadedFontFamily}", sans-serif`;
        previewText.style.fontSize = fontSize;
        previewText.style.letterSpacing = letterSpacing;
        previewText.style.lineHeight = lineHeight;
        previewText.style.color = textColor;
        previewCard.style.backgroundColor = bgColor;

        // Paragraph
        paragraphText.style.fontFamily = `"${loadedFontFamily}", sans-serif`;
        paragraphText.style.fontSize = Math.min(parseInt(fontSizeSlider.value), 32) + 'px';
        paragraphText.style.letterSpacing = letterSpacing;
        paragraphText.style.lineHeight = lineHeight;
        paragraphText.style.color = textColor;
        paragraphCard.style.backgroundColor = bgColor;

        // Waterfall
        const waterfallItems = waterfallText.querySelectorAll('.waterfall-sample');
        waterfallItems.forEach(item => {
            item.style.fontFamily = `"${loadedFontFamily}", sans-serif`;
            item.style.color = textColor;
        });
        waterfallCard.style.backgroundColor = bgColor;

        // Glyphs
        const glyphChars = glyphsGrid.querySelectorAll('.glyph-char');
        glyphChars.forEach(c => {
            c.style.fontFamily = `"${loadedFontFamily}", sans-serif`;
        });

        // Glyph detail
        glyphDetailChar.style.fontFamily = `"${loadedFontFamily}", sans-serif`;

        // Update values display
        fontSizeValue.textContent = fontSizeSlider.value + 'px';
        letterSpacingValue.textContent = letterSpacingSlider.value + 'px';
        lineHeightValue.textContent = lineHeightSlider.value + '%';
    }

    fontSizeSlider.addEventListener('input', applyStyles);
    letterSpacingSlider.addEventListener('input', applyStyles);
    lineHeightSlider.addEventListener('input', applyStyles);
    textColorPicker.addEventListener('input', applyStyles);
    bgColorPicker.addEventListener('input', applyStyles);

    // --- Tabs ---
    tabs.forEach(tab => {
        tab.addEventListener('click', () => {
            const target = tab.getAttribute('data-tab');
            currentTab = target;

            tabs.forEach(t => t.classList.remove('active'));
            tabContents.forEach(tc => tc.classList.remove('active'));

            tab.classList.add('active');
            document.getElementById('tab-' + target).classList.add('active');
        });
    });

    // --- Waterfall ---
    function generateWaterfall() {
        const sizes = [8, 10, 12, 14, 16, 18, 20, 24, 28, 32, 36, 42, 48, 56, 64, 72, 96];
        const sampleText = t('waterfallSample');

        waterfallText.innerHTML = '';
        sizes.forEach(size => {
            const row = document.createElement('div');
            const label = document.createElement('div');
            label.className = 'waterfall-label';
            label.textContent = size + 'px';

            const sample = document.createElement('div');
            sample.className = 'waterfall-sample';
            sample.style.fontSize = size + 'px';
            sample.style.fontFamily = `"${loadedFontFamily}", sans-serif`;
            sample.style.lineHeight = '1.3';
            sample.textContent = sampleText;

            row.appendChild(label);
            row.appendChild(sample);
            waterfallText.appendChild(row);
        });
    }

    // --- Glyphs ---
    const glyphRanges = {
        latin: [
            [0x0020, 0x007E], // Basic Latin
            [0x00A0, 0x00FF], // Latin-1 Supplement
        ],
        cyrillic: [
            [0x0400, 0x04FF], // Cyrillic
        ],
        numbers: [
            [0x0030, 0x0039], // 0-9
        ],
        punctuation: [
            [0x0020, 0x002F],
            [0x003A, 0x0040],
            [0x005B, 0x0060],
            [0x007B, 0x007E],
            [0x00A0, 0x00BF],
            [0x2010, 0x2027],
        ],
        symbols: [
            [0x2190, 0x21FF], // Arrows
            [0x2200, 0x22FF], // Mathematical
            [0x2500, 0x257F], // Box Drawing
            [0x25A0, 0x25FF], // Geometric Shapes
            [0x2600, 0x26FF], // Miscellaneous Symbols
        ],
    };

    function getAllGlyphs(category) {
        let ranges;
        if (category === 'all') {
            ranges = [
                [0x0020, 0x007E],
                [0x00A0, 0x00FF],
                [0x0100, 0x017F],
                [0x0400, 0x04FF],
                [0x2010, 0x2027],
                [0x2190, 0x21FF],
                [0x2200, 0x22FF],
            ];
        } else {
            ranges = glyphRanges[category] || [];
        }

        const chars = [];
        for (const [start, end] of ranges) {
            for (let i = start; i <= end; i++) {
                chars.push(String.fromCodePoint(i));
            }
        }
        return chars;
    }

    function generateGlyphs() {
        const category = glyphCategory.value;
        const searchTerm = glyphSearch.value.toLowerCase();
        const chars = getAllGlyphs(category);

        glyphsGrid.innerHTML = '';

        const fragment = document.createDocumentFragment();
        let count = 0;

        for (const char of chars) {
            const code = char.codePointAt(0);
            const hex = 'U+' + code.toString(16).toUpperCase().padStart(4, '0');

            if (searchTerm && !char.toLowerCase().includes(searchTerm) && !hex.toLowerCase().includes(searchTerm)) {
                continue;
            }

            const cell = document.createElement('div');
            cell.className = 'glyph-cell';
            cell.innerHTML = `
                <span class="glyph-char" style="font-family: '${loadedFontFamily}', sans-serif">${escapeHtml(char)}</span>
                <span class="glyph-code">${hex}</span>
            `;
            cell.addEventListener('click', () => showGlyphDetail(char, code));
            fragment.appendChild(cell);
            count++;

            if (count >= 500) break; // Performance limit
        }

        glyphsGrid.appendChild(fragment);
    }

    glyphSearch.addEventListener('input', debounce(generateGlyphs, 200));
    glyphCategory.addEventListener('change', generateGlyphs);

    function showGlyphDetail(char, code) {
        const hex = 'U+' + code.toString(16).toUpperCase().padStart(4, '0');
        const htmlEntity = '&#' + code + ';';

        glyphDetailChar.textContent = char;
        glyphDetailChar.style.fontFamily = `"${loadedFontFamily}", sans-serif`;
        glyphInfoChar.textContent = char;
        glyphInfoUnicode.textContent = hex;
        glyphInfoHtml.textContent = htmlEntity;

        glyphDetail.classList.remove('hidden');

        // Add overlay
        let overlay = document.querySelector('.overlay');
        if (!overlay) {
            overlay = document.createElement('div');
            overlay.className = 'overlay';
            document.body.appendChild(overlay);
        }
        overlay.style.display = 'block';
        overlay.addEventListener('click', closeGlyphDetail);
    }

    function closeGlyphDetail() {
        glyphDetail.classList.add('hidden');
        const overlay = document.querySelector('.overlay');
        if (overlay) overlay.style.display = 'none';
    }

    glyphDetailClose.addEventListener('click', closeGlyphDetail);

    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape') closeGlyphDetail();
    });

    // --- Info ---
    function generateInfo() {
        const info = [
            { label: t('infoFileName'), value: loadedFontName },
            { label: t('infoFormat'), value: loadedFontName.split('.').pop().toUpperCase() },
            { label: t('infoFontFamily'), value: loadedFontFamily },
            { label: t('infoDateLoaded'), value: new Date().toLocaleString(currentLang === 'ru' ? 'ru-RU' : 'en-US') },
        ];

        // Try to get more font info via canvas
        const canvas = document.createElement('canvas');
        const ctx = canvas.getContext('2d');
        ctx.font = `48px "${loadedFontFamily}"`;

        const testChars = 'АБВГДЕЁЖЗИЙКЛМНОПРСТУФХЦЧШЩЪЫЬЭЮЯабвгдеёжзийклмнопрстуфхцчшщъыьэюя';
        const latinChars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz';

        let cyrillicSupport = false;
        let latinSupport = false;

        // Check cyrillic support (compare metrics with fallback)
        for (const char of testChars) {
            ctx.font = `48px "${loadedFontFamily}"`;
            const w1 = ctx.measureText(char).width;
            ctx.font = '48px sans-serif';
            const w2 = ctx.measureText(char).width;
            if (Math.abs(w1 - w2) > 0.5) {
                cyrillicSupport = true;
                break;
            }
        }

        for (const char of latinChars) {
            ctx.font = `48px "${loadedFontFamily}"`;
            const w1 = ctx.measureText(char).width;
            ctx.font = '48px sans-serif';
            const w2 = ctx.measureText(char).width;
            if (Math.abs(w1 - w2) > 0.5) {
                latinSupport = true;
                break;
            }
        }

        info.push({ label: t('infoCyrillicSupport'), value: cyrillicSupport ? t('infoYes') : t('infoNo') });
        info.push({ label: t('infoLatinSupport'), value: latinSupport ? t('infoYes') : t('infoNo') });

        // Metrics
        ctx.font = `48px "${loadedFontFamily}"`;
        const metrics = ctx.measureText('Hg');
        if (metrics.fontBoundingBoxAscent !== undefined) {
            info.push({ label: 'Ascent', value: Math.round(metrics.fontBoundingBoxAscent) + ' ' + t('infoUnits') });
            info.push({ label: 'Descent', value: Math.round(metrics.fontBoundingBoxDescent) + ' ' + t('infoUnits') });
        }

        infoGrid.innerHTML = '';
        info.forEach(item => {
            const card = document.createElement('div');
            card.className = 'info-card';
            card.innerHTML = `
                <div class="info-card-label">${item.label}</div>
                <div class="info-card-value">${item.value}</div>
            `;
            infoGrid.appendChild(card);
        });
    }

    // --- Utilities ---
    function escapeHtml(str) {
        const div = document.createElement('div');
        div.textContent = str;
        return div.innerHTML;
    }

    function debounce(fn, delay) {
        let timer;
        return function (...args) {
            clearTimeout(timer);
            timer = setTimeout(() => fn.apply(this, args), delay);
        };
    }

    function showToast(message) {
        const existing = document.querySelector('.toast');
        if (existing) existing.remove();

        const toast = document.createElement('div');
        toast.className = 'toast';
        toast.textContent = message;
        document.body.appendChild(toast);

        setTimeout(() => {
            toast.classList.add('hide');
            setTimeout(() => toast.remove(), 300);
        }, 3000);
    }

    // --- Init ---
    initTheme();
    initLang();
})();
