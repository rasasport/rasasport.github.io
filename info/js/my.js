function fillDonateInfo(show) {
    $('#buy').modal('toggle');
    
    $("#vip").hide();
    $("#premium").hide();
    $("#creative").hide();
    $("#moder").hide();
    $("#lord").hide();
    $("#admin").hide();
    $("#ultra").hide();
    $("#gl").hide();
    $("#legenda").hide();
	$("#sponsor").hide();
	$("#sovlad").hide();
	
    $(show.toString()).show();
}