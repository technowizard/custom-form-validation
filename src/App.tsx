import { useState } from 'react';

import {
  Box,
  Flex,
  Container,
  Input,
  FormControl,
  FormLabel,
  FormErrorMessage,
  Text,
  Button,
  Select
} from '@chakra-ui/react';

import { useForm } from './hooks/useForm.hooks';

// define validator for each form value
const formValidators = {
  name: {
    required: {
      value: true,
      message: 'Name is required'
    }
  },
  gender: {
    required: {
      value: true,
      message: 'Gender is required'
    }
  },
  email: {
    required: {
      value: true,
      message: 'Email is required'
    },
    pattern: {
      value:
        '^[a-zA-Z0-9.!#$%&’*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:.[a-zA-Z0-9-]+)*$',
      message: 'Invalid email format'
    }
  },
  phone: {
    required: {
      value: true,
      message: 'Phone is required'
    },
    pattern: {
      value: '^[0-9]*$',
      message: 'Invalid input. Only number are allowed.'
    }
  },
  password: {
    required: {
      value: true,
      message: 'This field is required'
    },
    custom: {
      isValid: (value: string) => value.length > 8,
      message: 'The password needs to be at 8 characters'
    }
  }
};

// set initial form values
const formValues = {
  name: '',
  gender: '',
  email: '',
  phone: '',
  password: ''
};

const App = () => {
  const { data, handleChange, handleSubmit, errors, resetForm, validateInput } =
    useForm<any>({
      initialValues: formValues,
      validations: formValidators,
      onSubmit: () => alert('Form submitted!')
    });

  const [selectedForm, setSelectedForm] = useState<string>('');

  return (
    <Container flexDirection="column" p={8} gap={4}>
      <Box mb={8}>
        <Text fontWeight="bold">Dynamic Input Form with Custom Hooks</Text>
      </Box>
      <Box>
        <form onSubmit={handleSubmit}>
          <Flex flexDirection="column" gap={6}>
            <FormControl isInvalid={validateInput('name')}>
              <FormLabel htmlFor="name" fontWeight="medium" mb={2}>
                Name
              </FormLabel>
              <Input
                placeholder="Input your name..."
                onChange={handleChange('name')}
                value={data.name || ''}
              />
              <FormErrorMessage>
                {errors.name && (
                  <Text fontSize="12px" color="red.500">
                    {errors.name}
                  </Text>
                )}
              </FormErrorMessage>
            </FormControl>
            <FormControl isInvalid={validateInput('gender')}>
              <FormLabel htmlFor="gender" fontWeight="medium" mb={2}>
                Gender
              </FormLabel>
              <Select
                placeholder="Select option"
                onChange={handleChange('gender')}
              >
                <option value="male">Male</option>
                <option value="female">Female</option>
              </Select>
              <FormErrorMessage>
                {errors.gender && (
                  <Text fontSize="12px" color="red.500">
                    {errors.gender}
                  </Text>
                )}
              </FormErrorMessage>
            </FormControl>
            <FormControl isInvalid={validateInput('email')}>
              <FormLabel htmlFor="email" fontWeight="medium" mb={2}>
                Email
              </FormLabel>
              <Input
                placeholder="Input your email..."
                autoComplete="username"
                onChange={handleChange('email')}
                value={data.email || ''}
              />
              <FormErrorMessage>
                {errors.email && (
                  <Text fontSize="12px" color="red.500">
                    {errors.email}
                  </Text>
                )}
              </FormErrorMessage>
            </FormControl>
            <FormControl isInvalid={validateInput('phone')}>
              <FormLabel htmlFor="phone" fontWeight="medium" mb={2}>
                Phone Number
              </FormLabel>
              <Input
                placeholder="Input your phone..."
                onChange={handleChange('phone')}
                type="number"
                value={data.phone || ''}
              />
              <FormErrorMessage>
                {errors.phone && (
                  <Text fontSize="12px" color="red.500">
                    {errors.phone}
                  </Text>
                )}
              </FormErrorMessage>
            </FormControl>
            <FormControl isInvalid={validateInput('password')}>
              <FormLabel htmlFor="password" fontWeight="medium" mb={2}>
                Password
              </FormLabel>
              <Input
                placeholder="Input your password..."
                autoComplete="current-password"
                onChange={handleChange('password')}
                type="password"
                value={data.password || ''}
              />
              <FormErrorMessage>
                {errors.password && (
                  <Text fontSize="12px" color="red.500">
                    {errors.password}
                  </Text>
                )}
              </FormErrorMessage>
            </FormControl>

            <Button
              colorScheme="red"
              variant="outline"
              onClick={() => resetForm()}
            >
              <Text>Reset Form</Text>
            </Button>

            <Flex gap={4}>
              <Button
                colorScheme="red"
                variant="outline"
                onClick={() => resetForm(selectedForm)}
              >
                <Text>Reset Selected Form</Text>
              </Button>
              <Select
                flex="1"
                placeholder="Select option"
                onChange={(event) => setSelectedForm(event.target.value)}
              >
                <option value="name">name</option>
                <option value="gender">gender</option>
                <option value="email">email</option>
                <option value="phone">phone</option>
                <option value="password">password</option>
              </Select>
            </Flex>

            <Button colorScheme="blue" type="submit">
              <Text>Submit Form</Text>
            </Button>
          </Flex>
        </form>
      </Box>
      {/* Uncomment this line to see the exact value for errors and input value */}
      {/* <Flex direction="column" mt={8} gap={8}>
        <Box>
          <Text fontWeight="semibold">Validation Errors</Text>
          <Text fontSize="sm">{JSON.stringify(errors)}</Text>
        </Box>
        <Box>
          <Text fontWeight="semibold">Input Value</Text>
          <Text fontSize="sm">{JSON.stringify(data)}</Text>
        </Box>
      </Flex> */}
    </Container>
  );
};

export default App;
