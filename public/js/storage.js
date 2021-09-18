
var localstorage = localStorage.getItem('special_link')
$('#special_link').html(
	"<a href='"+localstorage+"'>"+localstorage+"</a>"
)