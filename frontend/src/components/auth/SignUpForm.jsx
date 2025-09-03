import styles from './SignUpForm.module.scss';
import EmailInput from "./EmailInput.jsx";
import {useState} from "react";
import VerificationInput from "./VerificationInput.jsx";
import ProgressBar from "../common/ProgressBar.jsx";

const SignUpForm = () => {

  // 현재 어떤 스텝인지 확인
  const [step, setStep] = useState(2);
  // 프로그레스바 노출 여부
  const [isNext, setIsNext] = useState(false);

  // 이메일 중복확인이 끝날 때 호출될 함수
  const emailSuccessHandler = () => {

    setIsNext(true); // progress bar 띄우기

    setTimeout(() => {
      setIsNext(false);
      setStep(2);
    }, 1000);

  }

  return (
    <div className={styles.signupForm}>
      <div className={styles.formStepActive}>
        {step === 1 && <EmailInput onSuccess={emailSuccessHandler} />}
        {step === 2 && <VerificationInput/>}

        {isNext && <ProgressBar/>}

      </div>
    </div>
  );
};

export default SignUpForm;
