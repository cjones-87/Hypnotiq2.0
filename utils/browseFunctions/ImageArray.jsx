import LogoCJ from '../../assets/logoCJ.png';
import Favicon from '../../assets/favicon.png';
import Favicon2 from '../../assets/favicon2.png';

const imageArray = () => {
  let array = [],
    first = LogoCJ,
    second = Favicon,
    third = Favicon2;
  for (let i = 0; i < 30; i++) {
    if (i % 3 === 0) {
      array.push(first);
    } else if (i % 3 === 1) {
      array.push(second);
    } else {
      array.push(third);
    }
  }
  return array;
};

export default imageArray;
