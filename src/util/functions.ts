export const randomId = () => {
	var S4 = function () {
		return (((1 + Math.random()) * 0x10000) | 0).toString(16).substring(1);
	};
	return S4() + "-" + S4() + S4();
};

export const replaceAll = (str: string, from: string, to: string) => {
	return str.replace(new RegExp(`${from}`, "gi"), to);
};

export const displayTime = (time: number, conf: string) => {
	let str = replaceAll(conf, "%h", ("0" + Math.floor((time / 3600000) % 60)).slice(-2));
	str = replaceAll(str, "%m", ("0" + Math.floor((time / 60000) % 60)).slice(-2));
	str = replaceAll(str, "%s", ("0" + Math.floor((time / 1000) % 60)).slice(-2));

	return str;
};
