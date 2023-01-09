const { convert } = require('html-to-text');

const convertHtmlToText = (html) => {
    const text = convert(html, {
        wordwrap: 130
    });
    return text;
}

export default convertHtmlToText;