import { useEffect, useState } from "react";
import Response from "src/components/Response";
import { ISurveyResponse } from "../entities/SurveyResponse";
import { Container } from 'react-bootstrap';
import { IQuestion } from "src/entities/Survey";

const ResponsesView = () => {
    const [responsesData, setResponses] = useState<ISurveyResponse[] | []>([]);

    const getAnswersSelected = () => {
        let questionsAnsered = new Map();
        responsesData.forEach((element) => {
            for (let i = 0; i < element.content.questions.length; i++) {
                const qelem = element.content.questions[i];
                if(!questionsAnsered.has(qelem.question)) {
                    questionsAnsered.set(qelem.question, new Map([[ qelem.answer, 1 ]]));
                } else {
                    if (!questionsAnsered.get(qelem.question).has(qelem.answer)){
                        questionsAnsered.get(qelem.question).set(qelem.answer, 1);
                    } else {
                        const oldValue = questionsAnsered.get(qelem.question).get(qelem.answer);
                        questionsAnsered.get(qelem.question).set(qelem.answer, oldValue + 1);
                    }
                }
            }
        });
        return questionsAnsered;
    };

    useEffect(() => {
        const loadResponses = async (): Promise<void> => {
            const res = await fetch(`http://localhost:2047/api/responses/`);
            let data;
            try {
                data = await res.json();
            } catch(error) {
                console.error(error);
                data = null;
            }

            if (res.ok && data.responses) {
                setResponses(data.responses);
            } else {
                console.error(`API failure: ${res.status}`, data);
            }
        }
        // TODO: Loading state
        console.log("loading...");
        loadResponses();
        console.log("done.");
    }, []);


    let questions: Array<IQuestion> = [];
    const mapQuestionsAnswered = getAnswersSelected(); 
    mapQuestionsAnswered.forEach((value, key) => {
        questions.push({ question: key, answers: Array.from(value)})
    });

    let qAndA = questions.map((element: IQuestion, index) => {
        return <Response question={ element.question } answers={ element.answers } key={ index } />
    });


    return (
        <Container className="pad-t">
            {qAndA}
        </Container>
    )
}

export default ResponsesView;
