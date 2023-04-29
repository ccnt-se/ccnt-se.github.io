import React from "react";
import {Carousel, Image, Tooltip} from "antd";

const ImageCarousel: React.FC<{ name: string, images: API.Tool.Image[] }> = ({name, images}) => {
  return (
    <Carousel
      appendDots={(dots: any[]) =>
        <ul style={{margin: 0}}>
          {
            dots && dots.map(dot => {
                const title = images[dot.key].title;
                return title ? <Tooltip title={title} key={dot.key}>
                  {dot}
                </Tooltip> : dot
              }
            )
          }
        </ul>
      }
    >
      {
        images.map(img => (
          <div key={img.url}>
            <Image preview={{mask: false}} src={`/data/tools/${name}/${img.url}`}/>
          </div>
        ))
      }
    </Carousel>
  )
}

export default ImageCarousel;
