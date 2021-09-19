var localstorage = localStorage.getItem('special_link')
var protocol     = 'https://';
var iTam         = localstorage.length;

$('#special_link').html(
	"<a href='"+protocol+localstorage.substr(8,iTam)+"'>"+localstorage+"</a>"
)