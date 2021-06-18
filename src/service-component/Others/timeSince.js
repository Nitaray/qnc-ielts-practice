export default function timeSince(date) {
	const seconds = Math.floor((Date.now() - date) / 1000);
	let interval = 0;

	interval = seconds / (365 * 24 * 60 * 60);
	if (interval > 1) {
		return Math.floor(interval) + " years ago";
	}
	interval = seconds / (30 * 24 * 60 * 60);
	if (interval > 1) {
		return Math.floor(interval) + " months ago";
	}
	interval = seconds / (24 * 60 * 60);
	if (interval > 1) {
		return Math.floor(interval) + " days ago";
	}
	interval = seconds / (60 * 60);
	if (interval > 1) {
		return Math.floor(interval) + " hours ago";
	}
	interval = seconds / 60;
	if (interval > 1) {
		return Math.floor(interval) + " minutes ago";
	}
	return Math.floor(seconds) + " seconds ago";
}