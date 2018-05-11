var env;
if (checkEnv("uatapi2") > 0) {
	env = "https://uatapi2.renrenbx.com";
} else if (checkEnv("api2") > 0) {
	env = "//api2.renrenbx.com";
} else if (checkEnv("localhost:7010") > 0) {
	env = "//localhost:7010";
} else if (checkEnv("localhost:8080") > 0) {
	env = "192.168.1.254:8080";
};

function checkEnv(par) {
	return window.location.origin.indexOf(par);
}

export default env;
