import { useState } from "react";
import Select from "react-select/dist/declarations/src/Select";

function FirstReserve(props) {
    const [firstCinema,setFirstCinema] = useState(null)
    const [othersCinemas,setOthersCinemas] = useState(null)

    return (
        <div className="first-reserve">
            <Select
                isClearable={true}
                isSearchable={true}
                placeholder="Busque o seleccione un cine"
                options={props.cinemas.map(
                    (cinema) => (
                        { value: cinema.cine, label: cinema.cine }
                    )
                )}
            >
            </Select>
            <div>

            </div>
            {
               Array.isArray(movies) && othersCinemas.map((times)=>(
                    <div>
                        {times.dates.map((date) => (
                            <button>
                                {date}
                            </button>
                        ))}
                    </div>
                ))
            }
        </div>
    );
}

export default FirstReserve;