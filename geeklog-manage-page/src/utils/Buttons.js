import {
  styled,
} from './styledFuncs'
import {Button} from '@material-ui/core'

const PrimaryButton = styled(Button)({
  backgroundColor: '#351bb5',
  backgroundImage: 'linear-gradient(45deg, #351bb5 14%, #130967 44%, #44156d 74%, #8239c4 91%)',
  borderRadius: 3,
  border: 0,
  color: 'white',
  height: 48,
  padding: '0 30px',
  boxShadow: '0 3px 5px 2px rgba(255, 105, 135, .3)',
});

const DangerButton = styled(Button)({
  backgroundColor: '#940303',
  backgroundImage: 'linear-gradient(180deg, #940303 25%, #ff2c2f 100%)',
  borderRadius: 3,
  border: 0,
  color: 'white',
  height: 48,
  padding: '0 30px',
  boxShadow: '0 3px 5px 2px rgba(255, 105, 135, .3)',
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