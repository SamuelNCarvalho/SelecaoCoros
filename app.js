const loadPage = (page) => {
    document.querySelector('#menu').close();
    document.getElementById('navigator').bringPageTop(page, { animation: 'slide' });
};

const clearAllCaches = () => {
    localStorage.clear();
    document
        .getElementById('cacheClear')
        .show();
};

const closeDialog = (dialog) => {
    localStorage.clear();
    document
        .getElementById(dialog)
        .hide();
};

const openMenu = () => {
    document.querySelector('#menu').open();
};

const zoomIn = () => {
    var currentSize = parseFloat(document.getElementById("contentBody").style.fontSize);
    document.getElementById("contentBody").style.fontSize = (currentSize + 5) + 'px';
};

const zoomOut = () => {
    var currentSize = parseFloat(document.getElementById("contentBody").style.fontSize);
    document.getElementById("contentBody").style.fontSize = (currentSize - 5) + 'px';
};

const loadHymn = (number) => {
    document.getElementById('navigator').bringPageTop('content.html', {
        data: {
            number: number,
        },
    });
};

const closeNotFoundHymnDialog = () => {
    document
        .getElementById('notFound')
        .hide();
    document.getElementById('navigator').popPage();
};

const updateHymnsList = () => {
    var cachedHymns = localStorage.getItem('hymns');

    if (cachedHymns != null) {
        var hymns = JSON.parse(cachedHymns);

        const list = document.querySelector('#hymns-list');
        list.innerHTML = '';
        hymns.forEach(hymn => {
            list.appendChild(ons.createElement(`
                <ons-list-item onclick="loadHymn(${hymn.number})">
                    ${hymn.number} : ${hymn.title}
                </ons-list-item>
            `));
        });
    }
};

document.addEventListener('init', ({ target }) => {
    if (target.matches('#home')) {
        let versionUrl = 'https://samuelncarvalho.github.io/SelecaoCoros/version.json';

        const getVersion = async () => {
            const response = await fetch(versionUrl);
            const json = await response.json();

            var hymnsVersion = localStorage.getItem('hymnsVersion');

            if (json != null) {
                if (hymnsVersion == null) {
                    hymnsVersion = json.version;
                    localStorage.setItem('hymnsVersion', hymnsVersion);
                }

                if (hymnsVersion != json.version) {
                    localStorage.setItem('hymnsVersion', json.version);
                    get();
                }
            }
        };


        var cachedHymns = localStorage.getItem('hymns');

        const get = async () => {
            let url = 'https://samuelncarvalho.github.io/SelecaoCoros/hymns.json';
            document.querySelector('#after-list').style.display = 'block';
            const response = await fetch(url);
            const json = await response.json();

            if (json != null) {
                localStorage.setItem('hymns', JSON.stringify(json));
            }

            document.querySelector('#after-list').style.display = 'none';

            updateHymnsList();
        };

        if (cachedHymns == null) {
            get();
        } else {
            updateHymnsList();
        }

        getVersion();
    } else if (target.matches('#content')) {
        var contentData = target.data;
        var cachedHymns = localStorage.getItem('hymns');

        if (cachedHymns == null || contentData == null || contentData.number == null) {
            document
                .getElementById('notFound')
                .show();
        }

        if (cachedHymns != null) {
            var hymns = JSON.parse(cachedHymns);

            var hymn = hymns.find(function(data){ return data.number == contentData.number });

            if (hymn == null) {
                document
                    .getElementById('notFound')
                    .show();
            } else {
                document.getElementById("contentTitle").innerHTML = `${hymn.number} - ${hymn.title}`;
                document.getElementById("contentBody").innerHTML = `${hymn.content}`;
            }
        }
    } else if (target.matches('#about')) { 
        var hymnsVersion = localStorage.getItem('hymnsVersion');
        document.getElementById("hymnsVersion").innerHTML = hymnsVersion;
    }
});