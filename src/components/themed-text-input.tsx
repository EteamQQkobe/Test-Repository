import { StyleSheet, TextInput, type TextInputProps } from 'react-native';

import { Fonts } from '@/constants/theme';
import { useTheme } from '@/hooks/use-theme';

export function ThemedTextInput({ style, placeholderTextColor, ...rest }: TextInputProps) {
  const theme = useTheme();

  return (
    <TextInput
      style={[
        styles.input,
        {
          color: theme.text,
          backgroundColor: theme.backgroundElement,
          borderColor: theme.backgroundSelected,
        },
        style,
      ]}
      placeholderTextColor={placeholderTextColor ?? theme.textSecondary}
      {...rest}
    />
  );
}

const styles = StyleSheet.create({
  input: {
    fontFamily: Fonts.sans,
    fontSize: 16,
    lineHeight: 24,
    paddingHorizontal: 16,
    paddingVertical: 12,
    borderRadius: 12,
    borderWidth: 1,
  },
});
