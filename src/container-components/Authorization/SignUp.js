import React, { useState } from 'react';
import { Link as RouteLink } from 'react-router-dom';
import makeStyles from "@material-ui/core/styles/makeStyles";
import Container from "@material-ui/core/Container";
import CssBaseline from "@material-ui/core/CssBaseline";
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import Avatar from "@material-ui/core/Avatar";
import { Text } from "../../presentational-components/Text";
import Grid from "@material-ui/core/Grid";

import { PasswordInput, SelectInput, TextInput } from "../../presentational-components/Input";
import { ActionButton } from "../../presentational-components/Button";
import { signUp } from "../../service-component/API/authorization";

export default function SignUp() {

}