const Counter = {

    const [counter, setCounter] = useState(0);
    
    return (
       <ButtonGroup size="small" aria-label="small outlined button group">

            <Button disabled={counter >= product['countInStock']} onClick={()=> 
            {setCounter(counter+1)}}>+</Button>

         {<Button disabled>{counter}</Button>}

          {<Button disabled={counter <= 0} onClick={() => {
            setCounter(counter - 1)
            }}>-</Button>}

      </ButtonGroup>
    )
}

export default Counter;