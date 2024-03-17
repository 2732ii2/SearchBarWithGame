export default function base64convertor(file) {
  console.log(file);
  var pr = new Promise((res, rej) => {
    var filereader = new FileReader();
    filereader.readAsDataURL(file);
    filereader.onload = async () => {
      var result = await filereader.result;
      console.log(result);
      return await res(filereader.result);
    };
    filereader.onerror = () => {
      console.log(filereader.error);
      //   return rej(filereader.error);
      //   return await rej(filereader.error);
    };
  });
  return pr;
}
