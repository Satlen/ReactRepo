import { DotSpinner } from "../styledComponents/dotSpinner"

export const Spinner = () => {
  return (
    <div style={{
        display: 'flex',
        alignContent: 'center',
        justifyContent: 'center',
        paddingBlock: '20px'
    }} >
        <DotSpinner  />
        <DotSpinner dot = {2} />
        <DotSpinner dot = {3} />
    </div>
  )
}
