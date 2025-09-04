import styles from './SignUpForm.module.scss';
import EmailInput from './EmailInput.jsx';
import VerificationInput from './VerificationInput.jsx';
import {useState} from 'react';
import ProgressBar from '../common/ProgressBar.jsx';
import PasswordInput from './PasswordInput.jsx';

const SignUpForm = () => {

  const [enteredEmail, setEnteredEmail] = useState('');

  // 회원가입 버튼 활성화 여부
  const [isActiveButton, setIsActiveButton] = useState(false);

  // 현재 어떤 스텝인지 확인
  const [step, setStep] = useState(3);
  // 프로그레스바 노출 여부
  const [isNext, setIsNext] = useState(false);

  // 다음 스텝으로 넘어가는 함수
  const nextStep = () => {
    setIsNext(true); // progress bar 띄우기

    setTimeout(() => {
      setStep(prev => prev + 1);
      setIsNext(false);
    }, 1000);
  };

  // 이메일 중복확인이 끝날때 호출될 함수
  const emailSuccessHandler = (email) => {
    setEnteredEmail(email);
    nextStep();
  };

  // 패스워드 입력이 끝날 때 호출될 함수
  const passwordSuccessHandler = (isValid) => {

    // 회원가입버튼을 열어줄지 여부
    setIsActiveButton(isValid);
  };

  return (
    <div className={styles.signupForm}>
      <div className={styles.formStepActive}>
        {step === 1 && <EmailInput onSuccess={emailSuccessHandler} />}
        {step === 2 && <VerificationInput email={enteredEmail} onSuccess={nextStep} />}
        {step === 3 && <PasswordInput onSuccess={passwordSuccessHandler} />}

        {isActiveButton && <div><button>회원가입 완료</button></div>}

        {isNext && <ProgressBar/>}

      </div>
    </div>
  );
};

export default SignUpForm;
