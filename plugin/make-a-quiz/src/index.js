import "./index.scss";
import {
  TextControl,
  Flex,
  FlexBlock,
  FlexItem,
  Button,
  Icon,
} from "@wordpress/components";

(function () {
  let locked = false;

  wp.data.subscribe(() => {
    const results = wp.data
      .select("core/block-editor")
      .getBlocks()
      .filter(
        (block) =>
          block.name == "plugin/make-a-quiz" &&
          block.attributes.correctAnswer == undefined
      );

    if (results.length && locked == false) {
      locked = true;
      wp.data.dispatch("core/editor").lockPostSaving("noanswer");
      console.log("lock");
    }

    if (!results.length && locked) {
      locked = false;
      wp.data.dispatch("core/editor").unlockPostSaving("noanswer");
    }
  });
})();

wp.blocks.registerBlockType("plugin/make-a-quiz", {
  title: "Make A Quiz",
  icon: "smiley",
  category: "common",
  attributes: {
    question: { type: "string" },
    answers: { type: "array", default: [""] },
    correctAnswer: { type: "number", default: undefined },
  },
  edit: EditComponent,
  save: function () {
    return null;
  },
});

function EditComponent(props) {
  function updateQuestion(value) {
    props.setAttributes({ question: value });
  }

  function deleteAnswer(idx) {
    const newAnswers = props.attributes.answers.filter(
      (x, index) => index != idx
    );
    props.setAttributes({ answers: newAnswers });

    if (idx == props.attributes.correctAnswer) {
      props.setAttributes({ correctAnswer: undefined });
    }
  }

  function markAsCorrect(idx) {
    props.setAttributes({ correctAnswer: idx });
  }

  return (
    <div className="make-a-quiz">
      <TextControl
        label="Question:"
        value={props.attributes.question}
        onChange={updateQuestion}
        style={{ fontSize: "20px" }}
      />
      <p style={{ fontSize: "13px", margin: "20px 0 8px 0" }}>Answers:</p>
      {props.attributes.answers.map((ans, idx) => {
        return (
          <Flex>
            <FlexBlock>
              <TextControl
                value={ans}
                onChange={(newValue) => {
                  const newAnswers = props.attributes.answers.concat([]);
                  newAnswers[idx] = newValue;
                  props.setAttributes({ answers: newAnswers });
                }}
              />
            </FlexBlock>
            <FlexItem>
              <Button onClick={() => markAsCorrect(idx)}>
                <Icon
                  className="mark-as-correct"
                  icon={
                    props.attributes.correctAnswer == idx
                      ? "star-filled"
                      : "star-empty"
                  }
                />
              </Button>
            </FlexItem>
            <FlexItem>
              <Button
                className="attention-delete"
                onClick={() => deleteAnswer(idx)}
              >
                Delete
              </Button>
            </FlexItem>
          </Flex>
        );
      })}

      <Button
        variant="primary"
        onClick={() => {
          props.setAttributes({
            answers: props.attributes.answers.concat([""]),
          });
        }}
      >
        Add another answer
      </Button>
    </div>
  );
}
