var commonJs = {
	loadAnimation: () => (
		$("body").append('<div id="logo_load"><div class="logo_load"><img src="https://www.renrenbx.com/test/logo-load.gif"/><p>Loading</p></div></div>'),
		$("#logo_load").show(),
		$("#logo_load").css("height", $(window).height())
	),
	loadClose: () => (
		$("#logo_load").hide(),
		$("#logo_load").remove()
	)
}

export default commonJs;