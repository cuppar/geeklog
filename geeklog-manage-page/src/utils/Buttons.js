import {
  styled,
} from './styledFuncs'
import { Button } from '@material-ui/core'

const PrimaryButton = styled(Button)({
  backgroundColor: '#255AB1',
  backgroundImage: 'linear-gradient(45deg, #255ab1 91%, #1e4fbd 100%);',
  borderRadius: 4,
  border: 0,
  color: 'white',
  height: 30,
  padding: '0 40px',
  boxShadow: '0 3px 5px 2px rgba(255, 105, 135, .3)',
  fontSize: 20,
  fontWeight: 'bold',
});

const DangerButton = styled(Button)({
  backgroundColor: '#DA3421',
  backgroundImage: 'linear-gradient(45deg, #da3421 73%, #c65419 100%);',
  borderRadius: 4,
  border: 0,
  color: 'white',
  height: 30,
  padding: '0 40px',
  boxShadow: '0 3px 5px 2px rgba(255, 105, 135, .3)',
  fontSize: 20,
  fontWeight: 'bold',
});

const PinkButton = styled(Button)({
  backgroundColor: '#FE6B8B',
  background: 'linear-gradient(45deg, #FE6B8B 30%, #FF8E53 90%)',
  borderRadius: 4,
  border: 0,
  color: 'white',
  height: 48,
  padding: '0 40px',
  boxShadow: '0 3px 5px 2px rgba(255, 105, 135, .3)',
  fontSize: 20,
  fontWeight: 'bold',
});


export {
  PrimaryButton,
  DangerButton,
  PinkButton,
};