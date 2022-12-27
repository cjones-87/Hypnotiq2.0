import { listAll } from '../../firebase';

const listAllOnlineMusic = () => {
  listAll('/');
  // listAll('Leonell Cassio/');
};

export default listAllOnlineMusic;
