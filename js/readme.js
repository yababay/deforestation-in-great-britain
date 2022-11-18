fetch('README.md')
    .then(res => res.text())
    .then(txt => {
        const converter = new showdown.Converter()
        const html = converter.makeHtml(txt)
        document.querySelector('#readme').innerHTML = html
    })