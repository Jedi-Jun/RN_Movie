import React from 'react';
import { StyleSheet } from 'react-native';
import styled from 'styled-components/native';

const Container = styled.View`
  margin-bottom: 20px;
`;

const TextInput = styled.TextInput`
  font-size: 16px;
  padding: 8px;
  border-bottom-width: ${StyleSheet.hairlineWidth}px;
  border-bottom-color: gray;
  color: white;
`;

interface IProps {
  placeholder: string;
  secureTextEntry?: boolean;
  clearMode?: boolean;
  keyboardType?: 'default' | 'email-address' | 'numeric' | 'phone-pad';
  onChangeText?: (text: string) => void;
}

export default function Input({
  placeholder,
  secureTextEntry = false,
  keyboardType,
  clearMode,
  onChangeText,
}: IProps) {
  return (
    <Container>
      <TextInput
        autoCapitalize="none"
        autoCorrect={false}
        allowFontScaling={false}
        clearButtonMode={clearMode ? 'while-editing' : 'never'}
        placeholder={placeholder}
        keyboardType={keyboardType ? keyboardType : 'default'}
        selectionColor="#fff"
        placeholderTextColor="#fff"
        secureTextEntry={secureTextEntry}
        onChangeText={onChangeText}
        // onChange={({ nativeEvent }) => setUserId(nativeEvent.text)}
        // onSubmitEditing={({ nativeEvent }) => nativeEvent.text}
      />
    </Container>
  );
}
