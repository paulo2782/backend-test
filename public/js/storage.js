var localstorage = localStorage.getItem('special_link')
var protocol     = 'https://';
var iTam         = localstorage.length;
var link         = protocol+localstorage.substr(7,iTam);
$('#special_link').html(
	"<a href='"+link+"'>"+link+"</a>"
)