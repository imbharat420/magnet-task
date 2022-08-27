import { Fragment } from "react";
import { useSnackbar } from "notistack";

export default function Notification(props) {
    const { enqueueSnackbar } = useSnackbar();
    const { messages } = props;

    messages.forEach(({msg,variant}) => {
        enqueueSnackbar(msg, {variant});
    });
    return <></>;
}
