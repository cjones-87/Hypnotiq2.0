import React, { useState } from 'react';

import { StyleSheet, View } from 'react-native';

import RadioForm, {
  RadioButton,
  RadioButtonInput,
  RadioButtonLabel,
} from 'react-native-simple-radio-button';

const GenderRadioButton = () => {
  const [selectedOption, setSelectedOption] = useState('');

  const options = [
    { label: 'male ', value: 'male' },
    { label: 'female ', value: 'female' },
    { label: 'non-binary ', value: 'non-binary' },
    { label: 'other ', value: 'other' },
  ];

  return (
    <View style={styles.sectionStyle}>
      <RadioForm formHorizontal={true} animation={true}>
        {options.map((obj, index) => (
          <RadioButton labelHorizontal={true} key={index}>
            <RadioButtonInput
              borderWidth={selectedOption === obj.value ? 9 : 1}
              buttonInnerColor={
                selectedOption === obj.value ? 'rebeccapurple' : 'transparent'
              }
              buttonOuterColor={'black'}
              buttonOuterSize={14}
              buttonSize={12}
              buttonWrapStyle={{ marginLeft: 10 }}
              index={index}
              isSelected={selectedOption}
              obj={obj}
              onPress={(selectedOption) => setSelectedOption(selectedOption)}
            />
            <RadioButtonLabel
              index={index}
              labelHorizontal={true}
              onPress={() => {
                [
                  (selectedOption) => setSelectedOption(selectedOption),
                  { selectedOption },
                ];
              }}
              labelStyle={
                selectedOption === obj.value
                  ? { fontWeight: 'bold', fontSize: 14, color: 'rebeccapurple' }
                  : { fontSize: 12, color: 'rebeccapurple' }
              }
              obj={obj}
            />
          </RadioButton>
        ))}
      </RadioForm>
    </View>
  );
};

const styles = StyleSheet.create({
  sectionStyle: {
    alignItems: 'center',
    flex: 1,
    justifyContent: 'space-evenly',
    marginRight: 7,
    marginTop: 6,
    textAlignVertical: 'center',
  },
});

export default GenderRadioButton;
