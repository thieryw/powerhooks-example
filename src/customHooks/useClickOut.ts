import {useEvt} from "evt/hooks";
import {Evt} from "evt";


export function useClickOut(params: {
    refs: React.RefObject<HTMLElement>[];
    onClickOut(): void;
}){
    const {onClickOut, refs} = params;




    useEvt(ctx => Evt.from(ctx, window, "click")
        .attach((event)=> {

            console.log(refs[0].current?.childElementCount);

            for(const ref of refs){


                if(!ref.current) return;

                if(
                    event.clientX >= ref.current.offsetLeft 
                        &&
                    event.clientX <= ref.current.offsetLeft + 
                    ref.current.offsetWidth
                        &&
                    event.clientY >= ref.current.offsetTop
                        &&
                    event.clientY <= ref.current.offsetTop +
                    ref.current.offsetHeight

                ) return;
            }

            onClickOut();
        })
    ,[]);
        
};