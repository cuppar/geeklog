import {
  styled,
} from './styledFuncs'
import {Button} from '@material-ui/core'

const PrimaryButton = styled(Button)({
  backgroundColor: '#2539c1',
  backgroundImage: 'linear-gradient(19deg, #2539c1 0%, #29208c 100%);',
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
  backgroundColor: '#96120b',
  backgroundImage: 'linear-gradient(180deg, #96120b 0%, #b90531 100%);',
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
  borderRadius: 3,
  border: 0,
  color: 'white',
  height: 48,
  padding: '0 30px',
  boxShadow: '0 3px 5px 2px rgba(255, 105, 135, .3)',
});


export {
  PrimaryButton,
  DangerButton,
  PinkButton,
};