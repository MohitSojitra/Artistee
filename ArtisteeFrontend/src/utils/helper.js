let capitalAlphabet = String.fromCharCode(...Array(91).keys()).slice(65);

const SearchByAlphabetAndSymbol = (str) => {
  return "#" + str + "]";
};

let alphabetLetter = SearchByAlphabetAndSymbol(capitalAlphabet);
export const searchLetters = alphabetLetter.split("");

export const validateEmail = (email) => {
  const regex =
    /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  return regex.test(email);
};

export const validateEmailValue = (email) => {
  if (email === "") {
    return "Please Enter Email";
  } else if (!validateEmail(email)) {
    return " Wrong Email formate please check again";
  } else {
    return "";
  }
};
