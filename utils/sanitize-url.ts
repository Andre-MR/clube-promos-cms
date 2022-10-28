export default function SanitizeURL(url: string) {
  let sanitizedURL = url ? url : "";
  const comAcentos = "ÄÅÁÂÀÃäáâàãÉÊËÈéêëèÍÎÏÌíîïìÖÓÔÒÕöóôòõÜÚÛüúûùÇç";
  const semAcentos = "AAAAAAaaaaaEEEEeeeeIIIIiiiiOOOOOoooooUUUuuuuCc";

  for (let i = 0; i < comAcentos.length; i++) {
    sanitizedURL = sanitizedURL.replaceAll(
      comAcentos[i].toString(),
      semAcentos[i].toString()
    );
  }

  sanitizedURL = sanitizedURL
    .replace(/[^a-zA-Z0-9 ]/g, "")
    .replace(/ /g, "-")
    .toLowerCase();

  return sanitizedURL;
}
