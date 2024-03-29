import React from 'react';
import { Text } from 'react-native';

export default class BlinkingText extends React.Component {
  constructor() {
    super();

    this.state = {
      visibleText: true,
    };
    setInterval(() => {
      this.setState((previousState) => {
        return { visibleText: !previousState.visibleText };
      });
    }, 1250);
  }
  render() {
    const { textData } = this.props;
    const { textData2 } = this.props;
    const { visibleText } = this.state;

    return (
      <Text
        style={{
          alignItems: 'center',
          justifyContent: 'center',
          textAlign: 'center',
          textAlignVertical: 'center',
        }}
      >
        {visibleText ? textData : ''}
        {`\n`}
        {!visibleText ? textData2 : ''}
      </Text>
    );
  }
}
