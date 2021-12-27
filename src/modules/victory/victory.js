import React,{useEffect,useState} from 'react';
import ReactDOM from 'react-dom';
// import * as V from 'victory';
import { Curve,VictoryAxis,VictoryChart,VictoryLabel,VictoryZoomContainer,VictoryCursorContainer,VictoryTheme,VictoryLine,VictoryScatter } from 'victory';

const Victory = (props)=>{

  const [maxY, setMaxY] = useState(0)
  const [minY, setMinY] = useState(0)

  useEffect(()=>{
    //get maxY here and set on victory chart
    let biggestNum = 0
    let smallestNum = 0
    if (props && props.dataSet){
      props.dataSet.map(data=>{
        if (data.y > biggestNum){
          biggestNum = data.y
        }
      })
      let smallestNum = biggestNum
      props.dataSet.map(data=>{
        if (data.y < smallestNum){
          smallestNum = data.y
        }
      })
      setMaxY((maxY)=>biggestNum)
      setMinY((minY)=>smallestNum)
    }
    // console.log(props)
  },[props.dataSet])

  return (
    <div>
    <VictoryChart
      theme={VictoryTheme.material}

      domain={{x:[0,props.dataSet.length+1],y:[Math.floor(minY),Math.ceil(maxY)]}}
      containerComponent={
        <VictoryZoomContainer/>


      }
    >
      <VictoryAxis
        dependentAxis
        style={{
          // axis: {stroke: "#756f6a"},
          axisLabel: {fontSize: 20},
          // grid: {stroke: ({ tick }) => tick > 0.5 ? "red" : "grey"},
          // ticks: {stroke: "", size: 5},
          tickLabels: {fontSize: 10}
        }}
      />
      <VictoryAxis
        fixLabelOverlap
        style={{
          axisLabel: {fontSize: 20},
          tickLabels: {fontSize: props.dataSet.length > 29 ? 5:10, padding:10}
        }}
      />
      <VictoryScatter
        data={props.dataSet}
        size={3}
        events={[{
          target: "data",
          eventHandlers: {
            onClick:(e)=>{
              return [
                {
                  target: "data",
                  mutation: (mutationProps) => {
                    props.pipeDataToBox(mutationProps)
                  }
                }
              ]
            },
            onMouseEnter:(e)=>{
              return [
                 {
                   target: "data",
                   mutation: (mutationProps) => {
                     props.pipeDataToBox(mutationProps)
                   }
                 }
              ]
            }
          }
        }]}
      />
      <VictoryLine
        // labels={({ datum }) => props.dataSet.length >= 30 ? null : datum.y}
        labelComponent={<VictoryLabel renderInPortal dy={-10}/>}
        style={{
          data: {
            stroke: "#c43a31",
            strokeWidth: 1,
            strokeLinecap: "square"
          },
          parent: { border: "1px solid #ccc"},
          labels: props.dataSet.length > 20 ?
          props.dataSet.length > 100 ? {fontSize: 3}:{fontSize: 5}
          :
          {fontSize: 5},


        }}
        data={props.dataSet}


      />
    </VictoryChart>
    </div>
  )
}

export default Victory
