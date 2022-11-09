import React, { useCallback, useState } from 'react';

import { StyleSheet, View } from 'react-native';

import { Days, Months, Years } from '../registrationData/DayMonthYearData';

import DropDownPicker from 'react-native-dropdown-picker';

import color from '../../../misc/color';

DropDownPicker.setListMode('SCROLLVIEW');
const DOBpicker = () => {
  const [dayOpen, setDayOpen] = useState(false);
  const [dayValue, setDayValue] = useState(null);
  const [day, setDay] = useState(Days);

  const [monthOpen, setMonthOpen] = useState(false);
  const [monthValue, setMonthValue] = useState(null);
  const [month, setMonth] = useState(Months);

  const [yearOpen, setYearOpen] = useState(false);
  const [yearValue, setYearValue] = useState(null);
  const [year, setYear] = useState(Years);

  const onDayOpen = useCallback(() => {
    setMonthOpen(false);
    setYearOpen(false);
  });

  const onMonthOpen = useCallback(() => {
    setDayOpen(false);
    setYearOpen(false);
  });

  const onYearOpen = useCallback(() => {
    setMonthOpen(false);
    setDayOpen(false);
  });

  return (
    <View style={[styles.container, { flexDirection: 'row' }]}>
      <View style={styles.flex}>
        <DropDownPicker
          dropDownContainerStyle={{
            backgroundColor: 'pink',
          }}
          dropDownDirection="TOP"
          items={month}
          itemSeparator
          open={monthOpen}
          searchable
          searchPlaceholder={'month'}
          searchPlaceholderTextColor={color.ACTIVE_BG}
          setItems={setMonth}
          setOpen={setMonthOpen}
          setValue={setMonthValue}
          value={monthValue}
          onOpen={onMonthOpen}
          placeholder={'Birth month'}
          style={{ backgroundColor: 'pink' }}
          zIndex={3000}
          zIndexInverse={1000}
        />
      </View>
      <View style={styles.flex}>
        <DropDownPicker
          autoScroll
          dropDownContainerStyle={{
            backgroundColor: 'pink',
          }}
          dropDownDirection="TOP"
          items={day}
          itemSeparator
          open={dayOpen}
          searchable
          searchPlaceholder={'day'}
          searchPlaceholderTextColor={color.ACTIVE_BG}
          setItems={setDay}
          setOpen={setDayOpen}
          setValue={setDayValue}
          value={dayValue}
          onOpen={onDayOpen}
          placeholder={'Birth day'}
          style={{ backgroundColor: 'pink' }}
          zIndex={3000}
          zIndexInverse={1000}
        />
      </View>
      <View style={styles.flex}>
        <DropDownPicker
          dropDownContainerStyle={{
            backgroundColor: 'pink',
          }}
          dropDownDirection="TOP"
          items={year}
          itemSeparator
          open={yearOpen}
          searchable
          searchPlaceholder={'year'}
          searchPlaceholderTextColor={color.ACTIVE_BG}
          setItems={setYear}
          setOpen={setYearOpen}
          setValue={setYearValue}
          value={yearValue}
          onOpen={onYearOpen}
          placeholder={'Birth year'}
          style={{ backgroundColor: 'pink' }}
          zIndex={3000}
          zIndexInverse={1000}
        />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  flex: { flex: 1 },
  sectionStyle: {
    alignItems: 'center',
    flex: 1,
    justifyContent: 'space-evenly',
    marginRight: 7,
    marginTop: 6,
    textAlignVertical: 'center',
  },
});

export default DOBpicker;
