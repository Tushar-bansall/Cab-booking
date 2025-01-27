import React from 'react'

const RateList = (props) => {

  return (
        <ul className="rounded-box bg-zinc-900 w-full md:w-[calc(40vw)] p-4 mb-14 md:mb-0">
            <li className='cursor-pointer' onClick={()=>props.function({
                vehicle: "Bike",
                fare: (20+(props.distance*5)/1000+(props.time*1)/60).toFixed(2)
            })}>
                <img className='w-10 h-10 inline' src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAADIAAAAyCAYAAAAeP4ixAAAACXBIWXMAAAsTAAALEwEAmpwYAAAD20lEQVR4nO2YX4gXVRTHR03TfiqiQaaF+ZCsimILppBumSGlJlT6to89+CCEoi+iD6JWPohaEVHZg/miomiUioYuKWFoBmFsq0X14D9Wc23X/+knjnwHrrc785uZ3cX9wXxefvM7c88998w959wzE0UlJSUlJSU1AvAcsAH4GbgFfAf0iWoFYAiwgzDzo1oB+EmL7gA2Aq8CayXbHdUKwA8KpzpHNlqO3AQqUa0CvO6E11zJlgIXgTvAn8AXwJNRTwUYD5xxHPlA8sZADu2PegLAFOXFMeACcCOw2BaNfQK45927mtdgX+AN4FMl53nHqG3134rzL4FJGeYbBnxFdkZL76Qnv5vHiVeAP3IYvZ7mDDDAqVRZWSjdVYV2BHgNuE1+TgPPJMy5vMB8TdKd5Mn3ZXXkN4pjobcNeFun9nArpcqFvFhujNGaTueuWsAv9Bzey7ToBEcGAisV0+1AG7AFeBMYpyc8GBgLLAC2Wtx2kyMXLb8KO1PA+cfV/BXJrRAHgKO6XtSVC50FfA78qv6oQ9dWmmc4414EWjvphDWTj6joGH8BDbJ1Srtv9luAzcBsoFc1B+qcJ5PGYWCUdMYAlymGlfzHNE8v4Gs5tKmKnvVuE5KcmKH8yIodkM9L92Xg3wKONDr2XwK263oocKmKruXz7NBO5HEipjU+S4DPcurag+gn3QnANclfkGxRhjk6HjiYgSMJsTtdVauiHWtKauqAkWrJs7JHer3Vh8Ucl+wtnU9DZN/yZmdgnhP3c0aJ7fNOSh69Gxg/Rfe+yeHIOunYS5bPx/o9ZE559pcExs+LVJ1cdkihv0rsecWrJeCjSkorly4fSWdhDkeWScfOLJftOtt+1//FgYe5y9PZEqmsukzXYHPC50Pdm+PJf3TKcVZWSKfZk0+T3ELprtqgqZ4jvp0zJvzHEw7UYNuJJNoTwu7ZHI5skI5VH5eKM98ayWwtTznyQZ5OR5oj5wo4Er+HZ2G5dNpC9g0lfZzg36c40hYKrQYNXh8wHr+Szk0ILatyWTho/VtC09oQL1j3rWJ9a4XEO3NcToWSfaeT7Ou1M616Xe2nZLeJQ8k+TkXhsPTisLmsMvkJMNNtMUw3ZD8N+4T0P/sJ5XdJyiTvB8bfP+GLYMmd0/6ywPhpaQfiLm1hReVwpj5xdvlXDmBvFfsVXfs7Yez1W5Qr5Kc1bh476cjTVapkEg9Us840jZM764Rjvx44m8O+ja1PmqwuIcx8DnXFTgTsj1CP53/bcrmnMSOyTDhL3Wxz2otVdwFM1GHYpBeqFl2vtnvdbb+kpKSkpKQkesj8B1fDIuqDvTvqAAAAAElFTkSuQmCC" alt="motorcycle" />               
                <div className='inline-flex flex-col my-1 ml-5'>
                    <strong>Bike</strong>
                    <p className='text-xxs w-48 break-words'>Zip through traffic at affordable fares</p>
                </div>
                <span classname="inline">
                    ₹{(20+(props.distance*5)/1000+(props.time*1)/60).toFixed(2)}
                </span>
            </li>
            <hr className="my-3" />
            <li className='cursor-pointer' onClick={()=>props.function({
                vehicle: "Auto",
                fare: (25+(props.distance*7)/1000+(props.time*1.5)/60).toFixed(2)
            })}>
                <img className='w-10 h-10 -scale-x-100 inline' src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACAAAAAgCAYAAABzenr0AAAACXBIWXMAAAsTAAALEwEAmpwYAAABqklEQVR4nO3VPWgXMRjH8Sq+4KCtoBRc3Byt1slBXHzppOBQcdMOgm5CnSzlL+IiCoLuhUIdXZykUDooDuKg6ODQwUVFFAQnX/AjJykc8RIvnotyPwiX5Eme55t77vIMDfXq1etfEDbgBhY7tPs4/acAs/iKeRxqaPORreo3qfIxXBp8B95jDoPEmkHdFsYpjZUCzOFqHKQDwERJ8DG8wZa/CDBVArCIs01BwtxWjBQCXGob/DheYF0GYCa0EoDbbYKvx0scjZzGAD/nCgHutgGYwpfoP14pALicAXjUBmCQ2BwDXAl3RAywkAF41QkAh2tv5R0ONAA8zwB8xpouAJtrN97OeipCf2NIX07bcsGP4HUKIAO8CjDu99rd5GQTbuF7ZmMOYLUWXKut/4h7WMK37G2IJy3IcwCxnmIXzuMU9uNTsJ1pcrIPxzAZTjIZxiewHDauJEptNR/rYDjUHTzA9RroxVT+p6s0hH6VjumabTxRilNtFB9qNeUZtgfbSApgL97iZniWlc5f/T0Ob+Bh9W203bQHF7oGD76GcQ4nsbarv169/k/9AImA/aKAIghzAAAAAElFTkSuQmCC" alt="external-auto-travel-and-transport-glyphons-amoghdesign" />           
                <div className='inline-flex flex-col my-1 ml-5'>
                    <strong>Auto</strong>
                    <p className='text-xxs w-48 break-words'>Get an auto at your doorstep</p>
                </div>
                <span classname="inline ">
                    ₹{(25+(props.distance*7)/1000+(props.time*1.5)/60).toFixed(2)}
                </span>
            </li>
            <hr className="my-3" />
            <li className='cursor-pointer' onClick={()=>props.function({
                vehicle: "Hatchback",
                fare: (40+(props.distance*10)/1000+(props.time*2)/60).toFixed(2)
            })}>
                <img className='w-10 h-10 inline' src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAADIAAAAyCAYAAAAeP4ixAAAACXBIWXMAAAsTAAALEwEAmpwYAAACHUlEQVR4nO3YO2tUQRjG8eMFDd4SEIOCdlYKNn4ARQU7kW0sRMXCQsVGFASxs46FiBZ+AA0oiJWVYjbYqGAqY6MShCBu8EZUSPzJkVlZl72cc3Y3ZMP8Yavzvu8zz5nZOe9MkkQikUgkEon0J1iGo3iCrzpnFmWUFtLEatzTO64shInluBsEP+EkhjLk/aXF8024iDn8xsGuD74WXAtj+oxdSUbaGamJuxRCP2Bj0gtwIYj8woGcuVmNpDP+OITf72jATQSOYD5M+7EC+ZmMhNhtmAkpJwoNuEnhPfgZCp8vWCOzkRB/PKR8w/YimvUFd9a8nRsd1MllJOTcCWnptryiqHZ1iqdCsR94iFf4YuGp4Clu4Rz2Y0sWEzswafFTwVgwmH6gB+pn4qP+5B12V43c1t9UsDU1Mq3/uflvh+lzppaKkfmlYkQ00o8zUsZerMF6HMbrHo6pXESvnZGJ9ITYoBMY6pGZiaJ6Seg4m3GoRVtT6r4PRfWm04DrLQKGWxTe0AMjwwX1RqqXC1fxJrTwM+FA1a7wYIiZq8mr/8120chgg/i0Kxn5r3msS0o7zKxTPZp0CB7k0Bsvcl5v9eebbCeeQ+9MDr3TeQoP1CSOYx/WhnVaqnn2KL2864KRdXibQe8FVuUtnh623rdYz2NZ7ri6qPcSm4sWTz9Il/E8bNPfwxs7hZXdMtFG7xnONlpykUgkEolEIsni5g/Bu4KBzabPCAAAAABJRU5ErkJggg==" alt="hatchback" />
                <div className='inline-flex flex-col my-1 ml-5'>
                    <strong>Hatchback</strong>
                    <p className='text-xxs w-48 break-words'>Comfy hatchbacks at pocket friendly fares</p>
                </div>
                <span classname="inline">
                    ₹{(40+(props.distance*10)/1000+(props.time*2)/60).toFixed(2)}
                </span>
            </li>
            <hr className="my-3" />
            <li className='cursor-pointer' onClick={()=>props.function({
                vehicle: "Sedan",
                fare: (55+(props.distance*12)/1000+(props.time*2.5)/60).toFixed(2)
            })}>
                <img className='w-10 h-10 inline' src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAADIAAAAyCAYAAAAeP4ixAAAACXBIWXMAAAsTAAALEwEAmpwYAAAB7UlEQVR4nO3Xz4tOURzH8cvCSD0zGYQNO2HnH1AWNnbTRFnIbAf5F2zEH+DHRtgo5W8QWTAWY0gWE7tnZiQkNIrFeOnoND1pnjvP/fVwdd51V/fz/X7Op/M9p3uzLJFIJBKJRKL94BDu4Z3yfMF9HPtbIU7gh3q5OOwQ+/Etml/Fnhztb3Leb8V5fI/S040tvBdswMNoeidbh/WC9OhORekyDmZNg6lo+BE76goStTej/BW21LLgPkbb8D6aTQ1YUyTIZryIJbcqLzjH6HY0eRRGrO4gUb8PXxs7LziMn/GmOlCgrlCQP8Z3udJ5wUYcxQXcxWzPLTVsPuMBrmMaR7B90Kv1pX+fDzHgNZwM56s3xE681U7erI4hrmg3n7A3BOlqPzdCkBXtZ2n1qmw5K/9LEClIG3eki0l04jOB+QbX1C3jlw3QdHyNL4FxLNS39up+Wbi6ct5P5nzWHK8/h7J+i0FwOUfQyWk82kCQTkm/S0GwKYZZKth4bMhBxtbQL4YQIUO/oidROJHTOBzIwOOsIo354Wwsms85fK+jZrpChjJ+Z4o0DuM2FwsX4kEbjc9kT9PZvttaLMigfs8K+2E3nufMc2i6q2qIAn5zpf0wgnN4Gv+lwzMTR6HyThT0G6nbL5FIJBKJRCJrll+J5mdwZj6/hwAAAABJRU5ErkJggg==" alt="sedan" />
                <div className='inline-flex flex-col my-1 ml-5'>
                    <strong>Sedan</strong>
                    <p className='text-xxs w-48 break-words'>Sedans with free WiFi and Top Drivers</p>
                </div>
                <span classname="inline ">
                    ₹{(55+(props.distance*12)/1000+(props.time*2.5)/60).toFixed(2)}
                </span>
            </li>
            <hr className="my-3" />
            <li className='cursor-pointer' onClick={()=>props.function({
                vehicle: "SUV",
                fare: (75+(props.distance*15)/1000+(props.time*3)/60).toFixed(2)
            })}>
                <img className='w-10 h-10 inline' src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAADIAAAAyCAYAAAAeP4ixAAAACXBIWXMAAAsTAAALEwEAmpwYAAACD0lEQVR4nO2Yu0okQRSGS8EL6ChooEbCBiKa+AAiLqK5DAYGm5nsKpgqJgbiC4iJRmKkLAi+wG7iJXDUQFDWbHQRURS8BLosn5ScgUZ6uqvLbh3b+qCiPv/565+qZrpKKYfD4XA4HP4AGWAaOAQeiI8zYBloU0kDNAMHJMs90J90kHUx2we6gUpD3TMBz8uBTuCnlN4CXbFOvgDQKyZXQJOKQFgQT10ZsCTleaAlio8RwC8xmLLQGgWR2gqPVw6oiepnshqXQF2SQaS+ETgWmd5u5VE9izUu/EKTlvpIQUTTDlyLdMbGN2g1Mm8VRHQDwD+Rf7Px9luNiVf0sAoi2hGRPwJfbSfQI00ugNr3CCL6Oc88vtg0WKP0uAE2gAVgHOjTf9RhQc75OFwCv4F5YBio9gb5yBwDHWkIUvgKaU1DEM1iWoL8TUuQ/2kJggtSaig+SZA8kJXLCD0GgaM3mFc+qq8Kadbg80nTAJzEP/fX+Sq5BPAjG/B9NpRcDmx8T/XD1SIPix6w9FE4wSAZC9/Zwtl5xWdlghrWv1OQ+he1pzqE75UVsClFgwEN9Yuo2VAxEbsvMCrFRwEv3R+p+R5DBhvfHyYNK4FdEZzIC1YnI+tptmN6C2kYxNQ3Z+yrb/+AvYB9nAs9etqFaQnx3Y3sC1QBY8A2cCdjS7ZAbCsR0bcqKV+Hw+FwOByqhHgC/wazH3TNLOgAAAAASUVORK5CYII=" alt="suv" />
                <div className='inline-flex flex-col my-1 ml-4'>
                    <strong>SUV</strong>
                    <p className='text-xxs w-48 break-words'>SUVs with free WiFi and Top Drivers</p>
                </div>
                <span classname="inline ">
                    ₹{(75+(props.distance*15)/1000+(props.time*3)/60).toFixed(2)}
                </span>
            </li>
            
            
            
            
        </ul>
  )
}

export default RateList