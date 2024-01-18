import styled from "styled-components";

interface Props {
  value: number;
}

const ProgressBar: React.FC<Props> = ({ value }) => {
  return (
    <BarContainer>
      <Bar fill={value} />
    </BarContainer>
  );
};

const BarContainer = styled.div`
  display: flex;
  width: 100%;
  height: 2px;
  background-color: #e3e1e1;
`;
const Bar = styled.span<{ fill: number }>`
  width: ${(props) => (props.fill < 100 ? props.fill + "%" : "100%")};
  height: 2px;
  background: #75d0be;
`;

export default ProgressBar;
