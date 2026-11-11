/* Tells the Meta Pixel ("arvin ads", in the page's <head>) when a visitor clicks a DTR Converter
 * download, so ads can be measured by downloads, not only visits.
 *
 * A download is a .exe or .zip link, a link to this product's GitHub releases, or any link marked
 * js-download — wherever it is on the page, now or added later. Each click sends two events:
 *   Lead      Meta's standard event, which an ad set can be set to aim for
 *   Download  a custom event with product "DTR Converter", for reports
 * Nothing else is sent: no names, no e-mail, no personal details.
 */
(function () {
  'use strict';

  var PRODUCT = 'DTR Converter';

  function isDownload(link) {
    var path = (link.href || '').split(/[?#]/)[0].toLowerCase();
    return link.classList.contains('js-download') || /\.(exe|zip)$/.test(path) ||
      path.indexOf('github.com/homearvin/dtr.converter/releases') !== -1;
  }

  document.addEventListener('click', function (event) {
    var link = event.target.closest && event.target.closest('a[href]');
    if (!link || !isDownload(link) || typeof window.fbq !== 'function') return;
    window.fbq('track', 'Lead', { content_name: PRODUCT });
    window.fbq('trackCustom', 'Download', { product: PRODUCT, platform: 'Windows' });
  }, true);
}());
