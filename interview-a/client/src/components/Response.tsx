import { IQuestion } from "../entities/Survey"
import "../styles/General.css"

const Response = ({ question, answers }: IQuestion) => {
    return (
        <div>
            <>
                <label>
                    <span> { question } </span>  <br/>
                </label> <br/>
                <div className="questionRow"> 
                    {answers.map(([answer, counter], index) => {
                        return (
                            <div key={index} className="answerBox"> 
                                    <span className="box__top"> { answer } </span>
                                    <span className="box__bottom"> {counter} </span>
                            </div>
                        );
                    })
                    }  
                </div>
            </>
            <br/><br/>
        </div>
    );
};

export default Response;
