function stringStartsWith(string, startsWith) {          
  string = string || "";
  if (startsWith.length > string.length)
      return false;
  return string.substring(0, startsWith.length) === startsWith;
};